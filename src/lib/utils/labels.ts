export interface InvitationLabels {
  together_with_families: string
  save_the_date: string
  days: string
  hours: string
  minutes: string
  seconds: string
  program: string
  venue: string
  ceremony: string
  reception: string
  dress_code: string
  rsvp_title: string
  rsvp_deadline_prefix: string
  attending_yes: string
  attending_no: string
  your_name: string
  your_email: string
  adults: string
  children: string
  menu_choice: string
  menu_meat: string
  menu_fish: string
  menu_vegetarian: string
  menu_vegan: string
  allergies: string
  message_label: string
  submit_rsvp: string
  thank_you: string
  thank_you_attending: string
  thank_you_not_attending: string
  accommodation_title: string
  transport_title: string
  gifts_title: string
  faq_title: string
  footer_tagline: string
  google_maps: string
  add_to_calendar: string
  story_title: string
  hashtag_label: string
  contact_title: string
  children_welcome: string
  children_adults_only: string
  children_infants_only: string
}

export const DEFAULT_LABELS: Record<string, InvitationLabels> = {
  sl: {
    together_with_families: 'Skupaj s svojimi družinami',
    save_the_date: 'Ohranite datum',
    days: 'dni', hours: 'ur', minutes: 'minut', seconds: 'sekund',
    program: 'Program',
    venue: 'Prizorišče',
    ceremony: 'Ceremonija',
    reception: 'Sprejem',
    dress_code: 'Dress code',
    rsvp_title: 'Potrdite udeležbo',
    rsvp_deadline_prefix: 'Prosimo odgovorite do',
    attending_yes: 'Pridem',
    attending_no: 'Ne morem priti',
    your_name: 'Vaše ime',
    your_email: 'E-naslov',
    adults: 'Odrasli',
    children: 'Otroci',
    menu_choice: 'Izbira menija',
    menu_meat: 'Meso',
    menu_fish: 'Ribe',
    menu_vegetarian: 'Vegetarijansko',
    menu_vegan: 'Vegansko',
    allergies: 'Alergije / posebne zahteve',
    message_label: 'Sporočilo za par',
    submit_rsvp: 'Pošlji potrditev',
    thank_you: 'Hvala!',
    thank_you_attending: 'Veselimo se vašega obiska.',
    thank_you_not_attending: 'Žal nam je, da ne boste prisotni.',
    accommodation_title: 'Nastanitev',
    transport_title: 'Prevoz & parkiranje',
    gifts_title: 'Darila',
    faq_title: 'Pogosta vprašanja',
    footer_tagline: 'Komaj čakamo!',
    google_maps: 'Google Maps',
    add_to_calendar: 'Dodaj v koledar',
    story_title: 'Naša zgodba',
    hashtag_label: 'Delite z nami',
    contact_title: 'Kontakt',
    children_welcome: 'Otroci so dobrodošli',
    children_adults_only: 'Samo odrasli',
    children_infants_only: 'Samo dojenčki',
  },
  hr: {
    together_with_families: 'Zajedno s svojim obiteljima',
    save_the_date: 'Sačuvajte datum',
    days: 'dana', hours: 'sati', minutes: 'minuta', seconds: 'sekundi',
    program: 'Program',
    venue: 'Mjesto',
    ceremony: 'Vjenčanje',
    reception: 'Domjenak',
    dress_code: 'Dress code',
    rsvp_title: 'Potvrdite dolazak',
    rsvp_deadline_prefix: 'Molimo odgovorite do',
    attending_yes: 'Dolazim',
    attending_no: 'Ne mogu doći',
    your_name: 'Vaše ime',
    your_email: 'E-mail',
    adults: 'Odrasli',
    children: 'Djeca',
    menu_choice: 'Odabir menija',
    menu_meat: 'Meso',
    menu_fish: 'Riba',
    menu_vegetarian: 'Vegetarijansko',
    menu_vegan: 'Vegansko',
    allergies: 'Alergije / posebni zahtjevi',
    message_label: 'Poruka za par',
    submit_rsvp: 'Pošalji potvrdu',
    thank_you: 'Hvala!',
    thank_you_attending: 'Radujemo se vašem dolasku.',
    thank_you_not_attending: 'Žao nam je što nećete biti s nama.',
    accommodation_title: 'Smještaj',
    transport_title: 'Prijevoz & parkiranje',
    gifts_title: 'Darovi',
    faq_title: 'Često postavljana pitanja',
    footer_tagline: 'Jedva čekamo!',
    google_maps: 'Google Maps',
    add_to_calendar: 'Dodaj u kalendar',
    story_title: 'Naša priča',
    hashtag_label: 'Podijelite s nama',
    contact_title: 'Kontakt',
    children_welcome: 'Djeca su dobrodošla',
    children_adults_only: 'Samo odrasli',
    children_infants_only: 'Samo dojenčad',
  },
  bs: {
    together_with_families: 'Zajedno sa svojim porodicama',
    save_the_date: 'Sačuvajte datum',
    days: 'dana', hours: 'sati', minutes: 'minuta', seconds: 'sekundi',
    program: 'Program',
    venue: 'Mjesto',
    ceremony: 'Vjenčanje',
    reception: 'Prijem',
    dress_code: 'Dress code',
    rsvp_title: 'Potvrdite prisustvo',
    rsvp_deadline_prefix: 'Molimo odgovorite do',
    attending_yes: 'Dolazim',
    attending_no: 'Ne mogu doći',
    your_name: 'Vaše ime',
    your_email: 'E-mail',
    adults: 'Odrasli',
    children: 'Djeca',
    menu_choice: 'Odabir menija',
    menu_meat: 'Meso',
    menu_fish: 'Riba',
    menu_vegetarian: 'Vegetarijansko',
    menu_vegan: 'Vegansko',
    allergies: 'Alergije / posebni zahtjevi',
    message_label: 'Poruka za par',
    submit_rsvp: 'Pošalji potvrdu',
    thank_you: 'Hvala!',
    thank_you_attending: 'Radujemo se vašem dolasku.',
    thank_you_not_attending: 'Žao nam je što nećete biti s nama.',
    accommodation_title: 'Smještaj',
    transport_title: 'Prijevoz & parkiranje',
    gifts_title: 'Pokloni',
    faq_title: 'Česta pitanja',
    footer_tagline: 'Jedva čekamo!',
    google_maps: 'Google Maps',
    add_to_calendar: 'Dodaj u kalendar',
    story_title: 'Naša priča',
    hashtag_label: 'Podijelite s nama',
    contact_title: 'Kontakt',
    children_welcome: 'Djeca su dobrodošla',
    children_adults_only: 'Samo odrasli',
    children_infants_only: 'Samo dojenčad',
  },
  sr: {
    together_with_families: 'Zajedno sa svojim porodicama',
    save_the_date: 'Sačuvajte datum',
    days: 'dana', hours: 'sati', minutes: 'minuta', seconds: 'sekundi',
    program: 'Program',
    venue: 'Lokacija',
    ceremony: 'Venčanje',
    reception: 'Prijem',
    dress_code: 'Dress code',
    rsvp_title: 'Potvrdite prisustvo',
    rsvp_deadline_prefix: 'Molimo odgovorite do',
    attending_yes: 'Dolazim',
    attending_no: 'Ne mogu doći',
    your_name: 'Vaše ime',
    your_email: 'E-mail',
    adults: 'Odrasli',
    children: 'Deca',
    menu_choice: 'Izbor menija',
    menu_meat: 'Meso',
    menu_fish: 'Riba',
    menu_vegetarian: 'Vegetarijansko',
    menu_vegan: 'Vegansko',
    allergies: 'Alergije / posebni zahtevi',
    message_label: 'Poruka za par',
    submit_rsvp: 'Pošalji potvrdu',
    thank_you: 'Hvala!',
    thank_you_attending: 'Radujemo se vašem dolasku.',
    thank_you_not_attending: 'Žao nam je što nećete biti s nama.',
    accommodation_title: 'Smeštaj',
    transport_title: 'Prevoz & parkiranje',
    gifts_title: 'Pokloni',
    faq_title: 'Česta pitanja',
    footer_tagline: 'Jedva čekamo!',
    google_maps: 'Google Maps',
    add_to_calendar: 'Dodaj u kalendar',
    story_title: 'Naša priča',
    hashtag_label: 'Podelite s nama',
    contact_title: 'Kontakt',
    children_welcome: 'Deca su dobrodošla',
    children_adults_only: 'Samo odrasli',
    children_infants_only: 'Samo odojčad',
  },
  en: {
    together_with_families: 'Together with their families',
    save_the_date: 'Save the Date',
    days: 'days', hours: 'hours', minutes: 'minutes', seconds: 'seconds',
    program: 'Schedule',
    venue: 'Venue',
    ceremony: 'Ceremony',
    reception: 'Reception',
    dress_code: 'Dress Code',
    rsvp_title: 'Kindly Reply',
    rsvp_deadline_prefix: 'Please respond by',
    attending_yes: "I'll be there",
    attending_no: "Can't make it",
    your_name: 'Your name',
    your_email: 'Email address',
    adults: 'Adults',
    children: 'Children',
    menu_choice: 'Menu choice',
    menu_meat: 'Meat',
    menu_fish: 'Fish',
    menu_vegetarian: 'Vegetarian',
    menu_vegan: 'Vegan',
    allergies: 'Allergies / dietary requirements',
    message_label: 'Message for the couple',
    submit_rsvp: 'Confirm Attendance',
    thank_you: 'Thank you!',
    thank_you_attending: "We can't wait to celebrate with you.",
    thank_you_not_attending: "We'll miss you on our special day.",
    accommodation_title: 'Accommodation',
    transport_title: 'Getting There',
    gifts_title: 'Gift Registry',
    faq_title: 'FAQ',
    footer_tagline: "We can't wait!",
    google_maps: 'Google Maps',
    add_to_calendar: 'Add to Calendar',
    story_title: 'Our Story',
    hashtag_label: 'Share with us',
    contact_title: 'Contact',
    children_welcome: 'Children welcome',
    children_adults_only: 'Adults only',
    children_infants_only: 'Infants only',
  },
}

export const LANGUAGE_OPTIONS = [
  { value: 'sl', label: '🇸🇮 Slovenščina' },
  { value: 'hr', label: '🇭🇷 Hrvatski' },
  { value: 'bs', label: '🇧🇦 Bosanski' },
  { value: 'sr', label: '🇷🇸 Srpski' },
  { value: 'en', label: '🇬🇧 English' },
]

export const LABEL_FIELD_GROUPS: { group: string; fields: (keyof InvitationLabels)[] }[] = [
  {
    group: 'Splošno',
    fields: ['together_with_families', 'save_the_date', 'days', 'hours', 'minutes'],
  },
  {
    group: 'Sekcije',
    fields: ['program', 'venue', 'ceremony', 'reception', 'dress_code', 'story_title', 'accommodation_title', 'transport_title', 'gifts_title', 'faq_title', 'contact_title'],
  },
  {
    group: 'Prijava gostov',
    fields: ['rsvp_title', 'rsvp_deadline_prefix', 'attending_yes', 'attending_no', 'your_name', 'your_email', 'adults', 'children', 'menu_choice', 'menu_meat', 'menu_fish', 'menu_vegetarian', 'menu_vegan', 'allergies', 'message_label', 'submit_rsvp'],
  },
  {
    group: 'Zahvala & ostalo',
    fields: ['thank_you', 'thank_you_attending', 'thank_you_not_attending', 'footer_tagline', 'google_maps', 'add_to_calendar', 'hashtag_label', 'children_welcome', 'children_adults_only', 'children_infants_only'],
  },
]
