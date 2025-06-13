import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {AttachmentService} from "../../../../_services/attachment.service";
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import {BookingService} from "../../../../_services/booking.service";
import {FullCalendarComponent} from "@fullcalendar/angular";
import frLocale from "@fullcalendar/core/locales/fr";
import {Booking} from "../../../../_models/Booking";
import {AlertService} from "../../../../_services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {forkJoin} from "rxjs";
import {Property} from "../../../../_models/Property";
import {Image} from "../../../../_models/Image";
import {PropertyService} from "../../../../_services/property.service";
import {GalleriaImage} from "../../../../_models/GalleriaImage";


@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  calendarOptions : CalendarOptions = {
    locale: frLocale,
    plugins:[
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      interactionPlugin
    ],
    initialView: 'dayGridMonth',
    selectable: true,
    selectMirror: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    weekends: false,
    headerToolbar:{
      left: 'prev,next,today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay' // Buttons
    },
    titleFormat: { // 🔧 Forcer l'affichage correct du mois
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    },
  }

  //images: any[] =[];
  responsiveOptions: any[] = [];
  visible: boolean =false;
  loadingCalendar = false;
  loadingPopertyWithImages = false;
  submittingOfBooking = false;
  newBookings: Booking[] = [];
  bookings: Booking[] = [];
  selectedPropertyId: string = "";
  propertyWithImages?: Property & { images: Image[] };
  images: GalleriaImage[] = [];


  constructor(private attachmentService: AttachmentService,
              private bookingService: BookingService,
              private alert: AlertService,
              private cdRef: ChangeDetectorRef,
              private route: ActivatedRoute,
              private propertyService: PropertyService,
              private router: Router) {
  }

  ngOnInit(){

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5
      },
      {
        breakpoint: '768px',
        numVisible: 3
      },
      {
        breakpoint: '560px',
        numVisible: 1
      }
    ]

    //this.attachmentService.getImages().then((images) => (this.images = images));
    this.route.paramMap.subscribe(params =>{
      this.selectedPropertyId = params.get('id')!;
    })
    this.combinePropertyDataWithImages();
  }


  combinePropertyDataWithImages() {
    this.loadingPopertyWithImages = true;
    forkJoin({
      property: this.propertyService.retrieveProperty(this.selectedPropertyId),
      images: this.attachmentService.retrieveImage(this.selectedPropertyId)
    }).subscribe({
      next: ({ property, images }: { property: Property, images: Image[] }) => {

        this.propertyWithImages = {
          ...property,
          images: images.filter(img => img.propertyId === property.id) // ici images est bien un tableau
        }
        this.images = this.propertyWithImages?.images?.map(image =>({
          itemImageSrc : image.filename,
          thumbnailImageSrc: image.filename,
          alt: 'Image de propriété',
          title: 'Image',
        })) || []
        this.loadingPopertyWithImages = true;
        console.log(this.propertyWithImages)
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.alert.error('Error loading property with images ')
        this.propertyWithImages =undefined;
      },
      complete:()=>{
        this.loadingPopertyWithImages = false;
      }
    });
  }

  showBookingDialog() {
    if(!this.visible){
      this.visible = true;
    }
  }

  onDialogShow(){
    const tryInitCalendar = () => {
      this.cdRef.detectChanges();
      if (this.calendarComponent) {
        const calendarApi = this.calendarComponent.getApi();
        calendarApi.updateSize();
        console.log('Calendar prêt, on charge les réservations');
        this.loadExistingBookings();
        this.loadingCalendar = false;
      } else {
        console.log('Attente de calendarComponent...');
        setTimeout(tryInitCalendar, 200);
      }
    };

    this.loadingCalendar = true;
    setTimeout(tryInitCalendar, 0); // attendre le cycle de vie Angular
  }


  handleDateSelect(arg: any){
    const now = new Date();
    const start = new Date(arg.start);
    const end = new Date(arg.end);

    const booking: Booking = {
      propertyId : this.selectedPropertyId,
      userId : "",
      startDate : arg.startStr,
      endDate : arg.endStr,
    }
    /*Disable bookings on two dates passed*/
    if(start < now){
      this.alert.warn("Impossible de réserver une date antérieure");
      return;
    }
    /*Disable overlap between two bookings*/
    const overlap = this.bookings?.some( b =>
      (start < new Date( b.endDate) && end > new Date(b.startDate))
    );
    if(overlap){
      this.alert.warn("Cette plage chevauche une réservation existante")
      return;
    }

    const exists = this.bookings?.some(b => b.startDate === booking.startDate && b.endDate === booking.endDate);
    if(exists) return ;

    this.newBookings.push(booking);
    this.bookings.push(booking);

    this.calendarComponent.getApi().addEvent({
      title: 'Plage sélectionnée',
      start: booking.startDate,
      end: booking.endDate,
      allDay: true,
      backgroundColor: '#42A5F5',
      borderColor: '#1E88E5'
    })
  }

  handleEventClick(arg: any){
    const event = arg.event;
    const isStored = event.extendedProps?.isStoredBooking;

    if(isStored){
      this.alert.warn("Cette réservation ne peut etre supprimée")
      return;
    }

    const start =  event.startStr;
    const end = event.endStr;

    this.newBookings = this.newBookings.filter(
      b => ! (b.startDate === start && b.endDate ===end)
    );

    this.bookings = this.bookings.filter(b => !(b.startDate === start && b.endDate === end ));
    event.remove();

  }

  submitBooking() {

    if(this.newBookings.length === 0) return;
    this.submittingOfBooking = true
    this.bookingService.createBookings(this.bookings).subscribe({
      next: () => {
        this.submittingOfBooking = true;
        this.newBookings = [];
        this.alert.success("Booking successfully registered")
      },
      error: (err) => {
        console.error("Booking registration error ");
        this.alert.error("Booking registration error :",err)
      },
      complete:()=>{
        this.submittingOfBooking = false;
        this.visible = false;
      }
    })
  }

  loadExistingBookings(){
    console.log("id : "+ this.selectedPropertyId)
    this.bookingService.getBookingsByProperty(this.selectedPropertyId).subscribe({
      next: (bookings: Booking[]) => {

        this.bookings = bookings ?? [];
        const calendarApi = this.calendarComponent.getApi();

        calendarApi.removeAllEvents();

        bookings?.forEach(b => {

          console.log("Ajout réservation dans calendrier :", b);

          calendarApi.addEvent({
            id: b.id,
            title: 'Réservation',
            start: b.startDate,
            end: b.endDate,
            allDay: true,
            backgroundColor: '',
            borderColor: '',
            extendedProps:{
              isStoredBooking: true
            }
          });
        });
        this.loadingCalendar = true;
      },
      error: err =>{
        console.error("Error loading reservations");
        this.alert.error("Error loading reservations",err)
      },
      complete: ()=> {
        this.loadingCalendar=false;
    }
    });
  }

  randomColor(){

  }

}
