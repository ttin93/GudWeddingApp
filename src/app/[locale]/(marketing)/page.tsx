'use client'

import './classic.css'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { SiteNav } from '@/components/ui/SiteNav'
import { SiteFooter } from '@/components/ui/SiteFooter'
import imgBled from './gallery/bled-lake.jpg'
import imgCeremony from './gallery/ceremony-bw.jpg'
import imgIstria from './gallery/istria-street.jpg'
import imgRovinj from './gallery/rovinj-sunset.jpg'
import imgTable from './gallery/table-flowers.jpg'
import imgVineyard from './gallery/vineyard-sunset.jpg'
import imgFirstDance from './gallery/first-dance-bw.jpg'

/* ─── translations ─── */
const T = {
  sl: {
    navTag:'VABILA · EST 2024',navBenefits:'Prednosti',navHow:'Kako deluje',navTemplates:'Vabila',navPricing:'Paketi',navFaq:'Vprašanja',navCta:'Začni',
    heroEyebrow:'Digitalna poročna vabila · Slovenija & Hrvaška',heroTitle1:'Vajin dan,',heroTitle2:'v eni povezavi.',
    heroSub:'Elegantno digitalno vabilo z vsem, kar vajin dan zasluži — RSVP, program, lokacija, glasba in galerija fotografij. Vse na eni povezavi.',
    heroCtaPrimary:'Ustvari vabilo',heroCtaSecondary:'Poglej 13 dizajnov',
    heroStat1:'zadovoljnih parov',heroStat2:'unikatnih dizajnov',heroStat3:'povprečna ocena',
    figRiviera:'Riviera Edition',figBotanical:'Toscana Botanical',figNoir:'Noir Velvet',figWatercolor:'Aquarelle',
    strip1:'Vse na enem mestu',strip2:'RSVP v živo',strip3:'Lastna domena',strip4:'Brez naročnine',strip5:'Slovenščina · English · Hrvatski',strip6:'Takoj online',
    benEyebrow:'— Zakaj digitalno —',benTitle1:'Vse, kar lahko papir,',benTitle2:'in še mnogo več.',benSub:'Eno digitalno vabilo za celo vajino zgodbo. Gostom posreduješ spremembe v sekundi, oni pa odgovorijo z enim klikom — kjerkoli na svetu.',
    b1t:'Vse na enem mestu',b1p:'Vabilo, program, lokacija, registry in foto galerija — eno polje za posodobitev, in vsi gostje vidijo novo.',
    b2t:'RSVP v živo',b2p:'Gostje potrdijo prihod z enim klikom. Izbirajo med jedmi, dodajo pesem za parket, sporočijo alergije.',
    b3t:'Trije jeziki',b3p:'Slovenščina, angleščina in hrvaščina — gostje pristanejo na svoji jezikovni različici samodejno.',
    b4t:'Brez papirja',b4p:'Brez tiskarne, brez znamk, brez izgubljenih kuvert. Bolj prijazno do okolja in do vajinega proračuna.',
    b5t:'Lastna domena',b5p:'lorena-in-viktor.si ali poljubna vajina domena. Spomin, ki ostane tudi po veliki noči.',
    b6t:'Takoj aktivno',b6p:'Plačata in vabilo je takoj aktivno na vajini povezavi. Besedila, datum ali fotografije spremenita kadarkoli sami — brez doplačila.',
    howEyebrow:'— Postopek —',howTitle1:'Trije koraki',howTitle2:'do vajinega vabila.',
    how1t:'Izberita dizajn',how1p:'Prebrskajta 13 dizajnov ali zaprosita za kaj povsem po meri. Dizajn izgleda točno tako, kot bo izgledalo vajino vabilo.',
    how2t:'Personalizirajta',how2p:'V urejevalniku vnesita vajini imeni, datum, lokacijo in posebnosti proslave. Naložita fotografije in vabilo dobi vajin osebni pečat.',
    how3t:'Vabilo je aktivno',how3p:'Takoj po plačilu je vajina povezava aktivna in pripravljena za pošiljanje gostom. Spremembe kadarkoli, brez doplačila.',
    tplEyebrow:'— Naša kolekcija —',tplTitle1:'Trinajst dizajnov,',tplTitle2:'en popoln dan.',tplSub:'Trinajst edinstvenih dizajnov — od nežnih do opulentnih. Vsak je takoj pripravljen za vajin dan.',
    catAll:'Vsi',catEditorial:'Romantično',catBotanical:'Naravno',catModern:'Sodobno',catLuxe:'Razkošno',
    tplFoot:'Vse predloge so popolnoma personalizirane. Tipografija, barve, fotografije in besedila — vse prilagojeno vajini zgodbi.',tplCtaCustom:'Želita custom dizajn?',
    galEyebrow:'— Spomini —',galTitle1:'Pravi pari,',galTitle2:'pravi trenutki.',galSub:'Drobci dni, ki smo jih pomagali pripraviti. Hvala parom, ki so delili svoje fotografije.',
    testEyebrow:'— Pari pravijo —',testTitle1:'Najlepši',testTitle2:'odzivi.',
    test1q:'Vabilo je bilo najlepša stvar na vsem najinem dnevu — še preden se je sploh začel. Gostje so naju klicali, kako čudovito je.',test1meta:'Rovinj · 06.2026',test1name:'Lorena & Viktor',
    test2q:'Trije jeziki, RSVP, zemljevid, glasba — vse ena povezava. Gostje iz tujine so prvič dejansko vedeli, kdaj kam in kako.',test2meta:'Bled · 09.2025',test2name:'Sara & Tilen',
    test3q:'Dva tedna pred poroko smo morali zamenjati lokacijo. Dva klika v urejevalniku — in vsi gostje so takoj videli novo lokacijo.',test3meta:'Piran · 07.2025',test3name:'Ana & Marko',
    testRating:'4.9 / 5 povprečna ocena',testCount:'na osnovi 187 ocen parov',
    priceEyebrow:'— Paketi —',priceTitle1:'Lepota,',priceTitle2:'brez kompromisa.',priceSub:'Trije paketi za večino parov. Če vaša zgodba zahteva več, naredimo nekaj povsem po meri.',priceOnce:'enkratno',priceFeatured:'Najpopularnejši',
    p1tier:'Brončani',p1t1:'Za',p1t2:'intimne',p1t3:'proslave.',p1l1:'Eno vabilo + RSVP forma',p1l2:'Odštevanje v živo',p1l3:'Galerija do 12 fotografij',p1l4:'Lokacija & zemljevid',p1l5:'3 dizajnerske različice',p1l6:'Personalizacija barv',p1l7:'Lastna domena',p1cta:'Izberi Brončanega',p1note:'Aktivno 6 mesecev',
    p2tier:'Zlati',p2t1:'Najboljša',p2t2:'izbira',p2t3:'za večino parov.',p2l1:'Vse iz Brončanega paketa',p2l2:'Neomejeno fotografij',p2l3:'Naša zgodba + program dneva',p2l4:'Personalizacija barv & pisav',p2l5:'Lastna domena (.si / .com)',p2l6:'Izbira jedi v RSVP-u',p2l7:'3 jeziki samodejno',p2l8:'Podpora do dneva poroke',p2cta:'Izberi Zlatega',p2note:'Aktivno 12 mesecev',
    p3tier:'Platinasti',p3t1:'Popolnoma',p3t2:'po meri.',p3l1:'Vse iz Zlatega paketa',p3l2:'Custom dizajn od nule',p3l3:'Več podstrani + zgodba',p3l4:'Custom animacije & prehodi',p3l5:'2 kroga revizij',p3l6:'Personalni vodja projekta',p3l7:'Online album po poroki',p3l8:'Aktivno 12 mesecev',p3cta:'Izberi Platinastega',p3note:'Aktivno 12 mesecev',
    custEyebrow:'— White Glove · brez templejtov —',custT1:'Ne najdeta svojega okusa?',custT2:'Naredimo ga skupaj.',custP:'Naš studio izdela vajino spletno vabilo od bele strani — vajini brendi, vajine barve, vajine animacije, vajina pisava. Brez kompromisov.',
    custL1:'Custom dizajn studio',custL2:'Animacije & 3D efekti',custL3:'Trije jeziki',custL4:'Live streaming integracija',
    custQuote:'"Vajina priča je premočna za polje s 99-tih izbir. Pišita nama."',custCta:'Zaprosi za ponudbo',
    faqEyebrow:'— Pogosta vprašanja —',faqTitle1:'Vse, kar parje',faqTitle2:'običajno vprašajo.',
    faq1q:'Kako hitro je vabilo živo?',faq1a:'Takoj po plačilu. Izbereta dizajn, personalizirata vsebino v editorju in vabilo je aktivno v minutah. Za Platinasti (custom dizajn od nule) pa traja 2 — 3 tedne, ker vključuje konzultacije in revizije z najinim studijem.',
    faq2q:'Lahko sama urejava vsebino po objavi?',faq2a:'Da. Vsi paketi vključujejo nadzorni vmesnik, kjer dodajata fotografije, posodabljata besedila in program ter sledita RSVP odgovorom — brez tehničnega znanja.',
    faq3q:'Kako dolgo je vabilo dostopno?',faq3a:'Vajino vabilo ostane dostopno glede na paket — Brončani 6 mesecev, Zlati in Platinasti 12 mesecev. Po izteku ga podaljšate za 24€ na leto.',
    faq4q:'Kateri jeziki so podprti?',faq4a:'Privzeto slovenščina, angleščina in hrvaščina — gostje samodejno pristanejo na svoji različici. Besedila vabila so vaša, zato jih po želji prevedete in vnesete v urejevalnik.',
    faq5q:'Kaj če morava kaj spremeniti zadnji teden?',faq5a:'Kadarkoli. Spremembe datuma, lokacije, menija ali fotografij naredita sami v urejevalniku — brez pisanja komurkoli. Vabilo se posodobi takoj.',
    faq6q:'Kako poteka plačilo?',faq6a:'Plačilo je enkratno z bančno kartico ob nakupu. Brončani, Zlati in Platinasti se plačajo v celoti takoj — brez skritih stroškov.',
    faq7q:'Kaj pa gostje brez pametnih telefonov?',faq7a:'Za starejše goste brez pametnih telefonov priporočamo, da natisnete preprosto kartico s QR kodo, ki jo gostje poskenirajo — to je hitra in poceni rešitev.',
    faq8q:'Kako naložimo fotografije v vabilo?',faq8a:'Fotografije naložita neposredno v urejevalnik — sistem jih samodejno optimizira za hitro nalaganje na vseh napravah.',
    ctEyebrow:'— Pišita nama —',ctT1:'Imata vprašanje',ctT2:'o vajinem vabilu?',ctP:'Pišita nama nekaj besed o vajini ideji — datumu, številu gostov, želenem stilu. Odgovorim osebno v 24 urah.',
    ctEmail:'E-pošta',ctPhone:'Telefon',ctStudio:'Studio',ctHours:'Odzivni čas',ctHoursVal:'običajno do 24 h',
    fName:'Vajina imena',fEmail:'E-pošta',fDate:'Datum poroke',fPackage:'Zanima naju',fMsg:'Sporočilo',fSend:'Pošlji povpraševanje',
    fOpt0:'— Izberita paket —',fOpt1:'Brončani · 69€',fOpt2:'Zlati · 89€',fOpt3:'Platinasti · 119€',fOpt4:'Custom — po meri',fOpt5:'Še se nisva odločila',
    fFine:'Z oddajo soglašata s kontaktom v zvezi z vašim povpraševanjem. Brez spama.',fSentT:'Hvala!',fSentP:'Sporočilo je oddano. Oglasiš se najkasneje v 24 urah.',
    footTag:'Elegantno digitalno vabilo za par, ki želi, da vajin dan ostane zapisan — za vedno.',
    footProduct:'Storitev',footStudio:'Studio',footLegal:'Pravno',footContact:'Kontakt',
    footL1:'Vabila',footL2:'Paketi',footL3:'Kako deluje',footL4:'Vprašanja',footL5:'Kontakt',footL6:'O nama',footL7:'Galerija parov',footL8:'Blog',footL9:'Pogoji',footL10:'Zasebnost',footL11:'Piškotki',footL12:'GDPR',
    footCopy:'© 2026 NajinDan · Made with care in Slovenia',
  },
  en: {
    navTag:'INVITATIONS · EST 2024',navBenefits:'Why',navHow:'How it works',navTemplates:'Designs',navPricing:'Packages',navFaq:'FAQ',navCta:'Begin',
    heroEyebrow:'Digital wedding invitations · Slovenia & Croatia',heroTitle1:'Your day,',heroTitle2:'in one link.',
    heroSub:'An elegant digital invitation with everything your day deserves — RSVP, schedule, venue, music and a photo gallery. All in one link.',
    heroCtaPrimary:'Create your invitation',heroCtaSecondary:'Browse 13 designs',
    heroStat1:'happy couples',heroStat2:'unique designs',heroStat3:'average rating',
    figRiviera:'Riviera Edition',figBotanical:'Toscana Botanical',figNoir:'Noir Velvet',figWatercolor:'Aquarelle',
    strip1:'All in one place',strip2:'Live RSVP',strip3:'Custom domain',strip4:'No subscription',strip5:'Slovenian · English · Croatian',strip6:'Instantly live',
    benEyebrow:'— Why digital —',benTitle1:'Everything paper can do,',benTitle2:'and a great deal more.',benSub:'One digital invitation for your whole story. Update guests in a second; they reply in one click — anywhere in the world.',
    b1t:'All in one place',b1p:'Invitation, programme, location, registry and photo gallery — one field to edit, and every guest sees the new version.',
    b2t:'Live RSVP',b2p:'Guests confirm in one click. They pick a menu option, request a song for the floor, flag allergies.',
    b3t:'Three languages',b3p:'Slovenian, English and Croatian — guests land on their own language automatically.',
    b4t:'No paper',b4p:'No printer, no stamps, no lost envelopes. Kinder to the planet and to your budget.',
    b5t:'Custom domain',b5p:'lorena-and-viktor.com or whatever your story calls for. A memory that lives on after the big day.',
    b6t:'Live instantly',b6p:'Pay and your invitation is immediately live on your link. Edit copy, dates or photos any time yourself — no extra fees.',
    howEyebrow:'— The process —',howTitle1:'Three steps',howTitle2:'to your invitation.',
    how1t:'Pick a design',how1p:'Browse our 13 designs or ask for something bespoke. The design looks exactly as your finished invitation will look.',
    how2t:'Personalise it',how2p:'In the editor enter your names, date, venue and the details of your celebration. Upload photos and the invitation takes on your personal touch.',
    how3t:'Invitation is live',how3p:'Immediately after payment your link is active and ready to share with guests. Edit any time, no extra fees.',
    tplEyebrow:'— The collection —',tplTitle1:'Thirteen designs,',tplTitle2:'one perfect day.',tplSub:'Thirteen unique designs — from delicate to opulent. Each is ready for your day, right from the start.',
    catAll:'All',catEditorial:'Romantic',catBotanical:'Natural',catModern:'Contemporary',catLuxe:'Opulent',
    tplFoot:'Every template is fully personalised. Type, colour, photography and copy — all tuned to your story.',tplCtaCustom:'Want something fully bespoke?',
    galEyebrow:'— Memories —',galTitle1:'Real couples,',galTitle2:'real moments.',galSub:'Fragments of days we helped prepare. Thanks to the couples who shared their photographs with us.',
    testEyebrow:'— Couples say —',testTitle1:'The kindest',testTitle2:'reviews.',
    test1q:'The invitation was the loveliest thing about our day — before the day even began. Guests rang to tell us how stunning it was.',test1meta:'Rovinj · 06.2026',test1name:'Lorena & Viktor',
    test2q:'Three languages, RSVP, the map, the music — all one link. For the first time our guests from abroad knew exactly when, where and how.',test2meta:'Bled · 09.2025',test2name:'Sara & Tilen',
    test3q:'Two weeks before the wedding we had to change venues. Two clicks in the editor — and every guest saw the new location within a minute.',test3meta:'Piran · 07.2025',test3name:'Ana & Marko',
    testRating:'4.9 / 5 average rating',testCount:'based on 187 couple reviews',
    priceEyebrow:'— Packages —',priceTitle1:'Beauty,',priceTitle2:'with no compromise.',priceSub:'Three packages for most couples. If your story needs more, we craft something fully bespoke.',priceOnce:'one-off',priceFeatured:'Most popular',
    p1tier:'Bronze',p1t1:'For',p1t2:'intimate',p1t3:'celebrations.',p1l1:'One invitation + RSVP form',p1l2:'Live countdown',p1l3:'Gallery up to 12 photos',p1l4:'Location & map',p1l5:'3 design variants',p1l6:'Colour personalisation',p1l7:'Custom domain',p1cta:'Choose Bronze',p1note:'Active 6 months',
    p2tier:'Gold',p2t1:'The best',p2t2:'choice',p2t3:'for most couples.',p2l1:'Everything in Bronze',p2l2:'Unlimited photos',p2l3:'Our story + day schedule',p2l4:'Colour & typography control',p2l5:'Custom domain (.si / .com)',p2l6:'Menu choice in RSVP',p2l7:'3 languages, automatic',p2l8:'Support up to the wedding',p2cta:'Choose Gold',p2note:'Active 12 months',
    p3tier:'Platinum',p3t1:'Fully',p3t2:'bespoke.',p3l1:'Everything in Gold',p3l2:'Custom design from scratch',p3l3:'Multiple pages + your story',p3l4:'Custom animations & transitions',p3l5:'2 rounds of revisions',p3l6:'Personal project lead',p3l7:'Online album after the day',p3l8:'Active 12 months',p3cta:'Choose Platinum',p3note:'Active 12 months',
    custEyebrow:'— White glove · no templates —',custT1:"Don't see your taste?",custT2:"Let's craft it together.",custP:"Our studio builds your invitation from a blank page — your brand, your colours, your animations, your typeface. No compromises.",
    custL1:'Custom design studio',custL2:'Animations & 3D effects',custL3:'Three languages',custL4:'Live-stream integration',
    custQuote:'"Your story is too big for a list of 99 options. Write to us."',custCta:'Request a quote',
    faqEyebrow:'— Common questions —',faqTitle1:'Everything couples',faqTitle2:'usually ask.',
    faq1q:'How quickly does the invitation go live?',faq1a:'Immediately after payment. Pick a design, personalise the content in the editor and your invitation is active within minutes. Platinum (custom design from scratch) takes 2 — 3 weeks as it includes consultation and revisions with our studio.',
    faq2q:'Can we edit content after publishing?',faq2a:'Yes. Every package includes a dashboard where you add photos, update text and schedule, and track RSVP responses — no technical knowledge required.',
    faq3q:'How long does the invitation stay accessible?',faq3a:'Your invitation stays accessible for the duration of your package — Bronze 6 months, Gold and Platinum 12 months. After that, extend it for €24 per year.',
    faq4q:'Which languages are supported?',faq4a:'Slovenian, English and Croatian by default — guests land on their version automatically. The invitation text is yours, so translate and enter it in the editor as you wish.',
    faq5q:'What if we need to make a change at the last minute?',faq5a:'Any time. Changes to the date, venue, menu or photos are made in the editor yourselves — no need to contact anyone. Updates appear immediately.',
    faq6q:'How do payments work?',faq6a:'Payment is a one-off card payment at checkout. Bronze, Gold and Platinum are paid in full immediately — no hidden costs.',
    faq7q:'What about guests without smartphones?',faq7a:'For older guests without smartphones, we recommend printing a simple card with a QR code they can scan — quick and inexpensive.',
    faq8q:'How do we add photos to the invitation?',faq8a:'Upload photos directly in the editor — the system automatically optimises them for fast loading on all devices.',
    ctEyebrow:'— Write to us —',ctT1:'Have a question',ctT2:'about your invitation?',ctP:'Tell us a few words about your idea — the date, the guest count, the style you have in mind. We reply personally within 24 hours.',
    ctEmail:'Email',ctPhone:'Phone',ctStudio:'Studio',ctHours:'Response time',ctHoursVal:'usually within 24 h',
    fName:'Your names',fEmail:'Email',fDate:'Wedding date',fPackage:"We're interested in",fMsg:'Message',fSend:'Send enquiry',
    fOpt0:'— Choose a package —',fOpt1:'Bronze · €69',fOpt2:'Gold · €89',fOpt3:'Platinum · €119',fOpt4:'Custom — bespoke',fOpt5:'Still deciding',
    fFine:'By submitting you agree to be contacted regarding your enquiry. No spam.',fSentT:'Thank you!',fSentP:"Your message is on its way. We'll reply within 24 hours.",
    footTag:'An elegant digital invitation for couples who want their day remembered — forever.',
    footProduct:'Product',footStudio:'Studio',footLegal:'Legal',footContact:'Contact',
    footL1:'Designs',footL2:'Packages',footL3:'How it works',footL4:'FAQ',footL5:'Contact',footL6:'About us',footL7:'Couples gallery',footL8:'Blog',footL9:'Terms',footL10:'Privacy',footL11:'Cookies',footL12:'GDPR',
    footCopy:'© 2026 NajinDan · Made with care in Slovenia',
  },
  hr: {
    navTag:'POZIVNICE · EST 2024',navBenefits:'Prednosti',navHow:'Kako radi',navTemplates:'Pozivnice',navPricing:'Paketi',navFaq:'Pitanja',navCta:'Započni',
    heroEyebrow:'Digitalne svadbene pozivnice · Slovenija & Hrvatska',heroTitle1:'Vaš dan,',heroTitle2:'u jednoj poveznici.',
    heroSub:'Elegantna digitalna pozivnica sa svime što vaš dan zaslužuje — RSVP, program, lokacija, glazba i galerija fotografija. Sve na jednoj poveznici.',
    heroCtaPrimary:'Izradi pozivnicu',heroCtaSecondary:'Pogledaj 13 dizajna',
    heroStat1:'zadovoljnih parova',heroStat2:'jedinstvena dizajna',heroStat3:'prosječna ocjena',
    figRiviera:'Riviera Edition',figBotanical:'Toscana Botanical',figNoir:'Noir Velvet',figWatercolor:'Aquarelle',
    strip1:'Sve na jednom mjestu',strip2:'RSVP uživo',strip3:'Vlastita domena',strip4:'Bez pretplate',strip5:'Slovenski · English · Hrvatski',strip6:'Odmah online',
    benEyebrow:'— Zašto digitalno —',benTitle1:'Sve što papir može,',benTitle2:'i puno više.',benSub:'Jedna digitalna pozivnica za cijelu vašu priču. Gostima prenosite promjene u sekundi, a oni odgovaraju jednim klikom — bilo gdje na svijetu.',
    b1t:'Sve na jednom mjestu',b1p:'Pozivnica, program, lokacija, registry i foto galerija — jedno polje za ažuriranje i svi gosti vide novo.',
    b2t:'RSVP uživo',b2p:'Gosti potvrđuju dolazak jednim klikom. Biraju jelo, dodaju pjesmu za podij, javljaju alergije.',
    b3t:'Tri jezika',b3p:'Slovenski, engleski i hrvatski — gosti se automatski nađu na vlastitoj jezičnoj verziji.',
    b4t:'Bez papira',b4p:'Bez printera, bez markica, bez izgubljenih kuverata. Ljepše prema okolišu i prema vašem proračunu.',
    b5t:'Vlastita domena',b5p:'lorena-i-viktor.hr ili bilo koja vaša domena. Uspomena koja ostaje i nakon velikog dana.',
    b6t:'Odmah aktivno',b6p:'Platite i pozivnica je odmah aktivna na vašoj poveznici. Tekstove, datum ili fotografije mijenjate sami kad god želite — bez doplate.',
    howEyebrow:'— Postupak —',howTitle1:'Tri koraka',howTitle2:'do vaše pozivnice.',
    how1t:'Odaberite dizajn',how1p:'Pregledajte 13 dizajna ili zatražite nešto potpuno po mjeri. Dizajn izgleda točno onako kako će izgledati vaša pozivnica.',
    how2t:'Personalizirajte',how2p:'U editoru unesite vaša imena, datum, lokaciju i posebnosti proslave. Učitajte fotografije i pozivnica dobiva vaš osobni pečat.',
    how3t:'Pozivnica je aktivna',how3p:'Odmah nakon plaćanja vaša je poveznica aktivna i spremna za slanje gostima. Izmjene u bilo koje vrijeme, bez doplate.',
    tplEyebrow:'— Naša kolekcija —',tplTitle1:'Trinaest dizajna,',tplTitle2:'jedan savršeni dan.',tplSub:'Trinaest jedinstvenih dizajna — od nježnih do raskošnih. Svaki je odmah spreman za vaš dan.',
    catAll:'Svi',catEditorial:'Romantično',catBotanical:'Prirodno',catModern:'Suvremeno',catLuxe:'Raskošno',
    tplFoot:'Sve pozivnice su potpuno personalizirane. Tipografija, boje, fotografije i tekstovi — sve prilagođeno vašoj priči.',tplCtaCustom:'Želite custom dizajn?',
    galEyebrow:'— Uspomene —',galTitle1:'Pravi parovi,',galTitle2:'pravi trenuci.',galSub:'Fragmenti dana koje smo pomogli pripremiti. Hvala parovima koji su podijelili svoje fotografije.',
    testEyebrow:'— Parovi kažu —',testTitle1:'Najljepši',testTitle2:'odgovori.',
    test1q:'Pozivnica je bila najljepša stvar na cijelom našem danu — prije nego je dan uopće započeo. Gosti su nas zvali da nam kažu kako je predivna.',test1meta:'Rovinj · 06.2026',test1name:'Lorena & Viktor',
    test2q:'Tri jezika, RSVP, karta, glazba — sve jedna poveznica. Gosti iz inozemstva su prvi put točno znali kada, gdje i kako.',test2meta:'Bled · 09.2025',test2name:'Sara & Tilen',
    test3q:'Dva tjedna prije svadbe morali smo promijeniti lokaciju. Dva klika u editoru — i svi gosti su za minutu vidjeli novu lokaciju.',test3meta:'Piran · 07.2025',test3name:'Ana & Marko',
    testRating:'4.9 / 5 prosječna ocjena',testCount:'na temelju 187 ocjena parova',
    priceEyebrow:'— Paketi —',priceTitle1:'Ljepota,',priceTitle2:'bez kompromisa.',priceSub:'Tri paketa za većinu parova. Ako vaša priča traži više, izrađujemo nešto potpuno po mjeri.',priceOnce:'jednokratno',priceFeatured:'Najpopularniji',
    p1tier:'Brončani',p1t1:'Za',p1t2:'intimne',p1t3:'proslave.',p1l1:'Jedna pozivnica + RSVP',p1l2:'Odbrojavanje uživo',p1l3:'Galerija do 12 fotografija',p1l4:'Lokacija & karta',p1l5:'3 dizajnerske varijante',p1l6:'Personalizacija boja',p1l7:'Vlastita domena',p1cta:'Odaberi Brončani',p1note:'Aktivno 6 mjeseci',
    p2tier:'Zlatni',p2t1:'Najbolji',p2t2:'izbor',p2t3:'za većinu parova.',p2l1:'Sve iz Brončanog paketa',p2l2:'Neograničeno fotografija',p2l3:'Naša priča + program dana',p2l4:'Personalizacija boja & fontova',p2l5:'Vlastita domena (.hr / .com)',p2l6:'Izbor jela u RSVP-u',p2l7:'3 jezika automatski',p2l8:'Podrška do dana svadbe',p2cta:'Odaberi Zlatni',p2note:'Aktivno 12 mjeseci',
    p3tier:'Platinasti',p3t1:'Potpuno',p3t2:'po mjeri.',p3l1:'Sve iz Zlatnog paketa',p3l2:'Custom dizajn od nule',p3l3:'Više podstranica + priča',p3l4:'Custom animacije & prijelazi',p3l5:'2 kruga revizija',p3l6:'Osobni voditelj projekta',p3l7:'Online album nakon svadbe',p3l8:'Aktivno 12 mjeseci',p3cta:'Odaberi Platinasti',p3note:'Aktivno 12 mjeseci',
    custEyebrow:'— White glove · bez predložaka —',custT1:'Ne nalazite svoj ukus?',custT2:'Izradimo ga zajedno.',custP:'Naš studio izrađuje vašu pozivnicu od bijele stranice — vaši brendovi, vaše boje, vaše animacije, vaš font. Bez kompromisa.',
    custL1:'Custom dizajn studio',custL2:'Animacije & 3D efekti',custL3:'Tri jezika',custL4:'Live stream integracija',
    custQuote:'"Vaša priča je prejaka za polje od 99 izbora. Pišite nam."',custCta:'Zatraži ponudu',
    faqEyebrow:'— Česta pitanja —',faqTitle1:'Sve što parovi',faqTitle2:'obično pitaju.',
    faq1q:'Koliko brzo pozivnica ide uživo?',faq1a:'Odmah nakon plaćanja. Odaberite dizajn, personalizirajte sadržaj u editoru i pozivnica je aktivna za nekoliko minuta. Platinasti (custom dizajn od nule) traje 2 — 3 tjedna jer uključuje konzultacije i revizije s našim studijem.',
    faq2q:'Možemo li sami uređivati sadržaj nakon objave?',faq2a:'Da. Svi paketi uključuju upravljačko sučelje gdje dodajete fotografije, ažurirate tekstove i program te pratite RSVP odgovore — bez tehničkog znanja.',
    faq3q:'Koliko dugo je pozivnica dostupna?',faq3a:'Vaša pozivnica ostaje dostupna prema trajanju paketa — Brončani 6 mjeseci, Zlatni i Platinasti 12 mjeseci. Nakon isteka produžujete je za 24€ godišnje.',
    faq4q:'Koji jezici su podržani?',faq4a:'Slovenski, engleski i hrvatski po defaultu — gosti automatski pristaju na svoju verziju. Tekstovi pozivnice su vaši, pa ih po želji prevedete i unesete u editor.',
    faq5q:'Što ako trebamo nešto promijeniti u zadnji čas?',faq5a:'Bilo kada. Izmjene datuma, lokacije, menija ili fotografija radite sami u editoru — bez pisanja ikome. Pozivnica se osvježava odmah.',
    faq6q:'Kako ide plaćanje?',faq6a:'Plaćanje je jednokratno karticom pri kupnji. Brončani, Zlatni i Platinasti plaćaju se u cijelosti odmah — bez skrivenih troškova.',
    faq7q:'Što s gostima bez pametnih telefona?',faq7a:'Za starije goste bez pametnih telefona preporučamo ispis jednostavne kartice s QR kodom koji skeniraju — brzo i jeftino.',
    faq8q:'Kako dodajemo fotografije u pozivnicu?',faq8a:'Fotografije izravno učitajte u editor — sustav ih automatski optimizira za brzo učitavanje na svim uređajima.',
    ctEyebrow:'— Pišite nam —',ctT1:'Imate pitanje',ctT2:'o vašoj pozivnici?',ctP:'Pišite nam nekoliko riječi o vašoj ideji — datumu, broju gostiju, željenom stilu. Odgovaramo osobno u 24 sata.',
    ctEmail:'E-mail',ctPhone:'Telefon',ctStudio:'Studio',ctHours:'Vrijeme odgovora',ctHoursVal:'obično do 24 h',
    fName:'Vaša imena',fEmail:'E-mail',fDate:'Datum svadbe',fPackage:'Zanima nas',fMsg:'Poruka',fSend:'Pošalji upit',
    fOpt0:'— Odaberite paket —',fOpt1:'Brončani · 69€',fOpt2:'Zlatni · 89€',fOpt3:'Platinasti · 119€',fOpt4:'Custom — po mjeri',fOpt5:'Još se nismo odlučili',
    fFine:'Slanjem pristajete na kontakt vezan uz vaš upit. Bez spama.',fSentT:'Hvala!',fSentP:'Poruka je poslana. Javljamo se najkasneje u 24 sata.',
    footTag:'Elegantna digitalna pozivnica za par koji želi da njihov dan ostane upamćen — zauvijek.',
    footProduct:'Usluga',footStudio:'Studio',footLegal:'Pravno',footContact:'Kontakt',
    footL1:'Pozivnice',footL2:'Paketi',footL3:'Kako radi',footL4:'Pitanja',footL5:'Kontakt',footL6:'O nama',footL7:'Galerija parova',footL8:'Blog',footL9:'Uvjeti',footL10:'Privatnost',footL11:'Kolačići',footL12:'GDPR',
    footCopy:'© 2026 NajinDan · Made with care in Slovenia',
  },
} as const

type Locale = keyof typeof T

/* ─── template mini-card data ─── */
type ArtEl = { cls: string; txt: string }
type TplDef = { id: number; cat: string; style: string; name: string; price: string; art: ArtEl[] }

const TMPL: TplDef[] = [
  // editorial
  { id:1, cat:'editorial', style:'riviera', name:'Riviera Edition', price:'Zlati',
    art:[{cls:'top',txt:'— Save the Date —'},{cls:'nm',txt:'Lorena &amp; Viktor'},{cls:'dt',txt:'12 · 06 · 2026'}]},
  { id:2, cat:'editorial', style:'heritage', name:'Heritage', price:'Zlati',
    art:[{cls:'top',txt:'— Wedding 2026 —'},{cls:'nm',txt:'Ana'},{cls:'amp',txt:'&'},{cls:'nm',txt:'Marko'},{cls:'dt',txt:'18. junij 2026'}]},
  { id:3, cat:'editorial', style:'eliarose', name:'Elia Rose', price:'Zlati',
    art:[{cls:'top',txt:'— Save the Date —'},{cls:'nm',txt:'Maja'},{cls:'amp',txt:'&'},{cls:'nm',txt:'Luka'},{cls:'dt',txt:'julij 2026'}]},
  // botanical
  { id:4, cat:'botanical', style:'toscana', name:'Toscana', price:'Brončani',
    art:[{cls:'top',txt:'— Wedding —'},{cls:'nm',txt:'Ema &amp; Tim'},{cls:'yr',txt:'2026'}]},
  { id:5, cat:'botanical', style:'botanica', name:'Botanica', price:'Brončani',
    art:[{cls:'top',txt:'— Save the Date —'},{cls:'nm',txt:'Nika &amp; Rok'},{cls:'dt',txt:'14 · MAJ · 2026'}]},
  { id:6, cat:'botanical', style:'rosewood', name:'Rosewood', price:'Zlati',
    art:[{cls:'top',txt:'— Wedding —'},{cls:'nm',txt:'Eva'},{cls:'amp',txt:'&'},{cls:'nm',txt:'Jan'},{cls:'dt',txt:'september 2026'}]},
  // modern
  { id:7, cat:'modern', style:'scandi', name:'Scandi Light', price:'Brončani',
    art:[{cls:'top',txt:'2026'},{cls:'nm',txt:'Mia &amp; Luka'},{cls:'div',txt:''},{cls:'dt',txt:'05 · 09 · 26'}]},
  { id:8, cat:'modern', style:'coastal', name:'Coastal', price:'Brončani',
    art:[{cls:'top',txt:'— SEASIDE · 2026 —'},{cls:'nm',txt:'Eva &amp; Mark'},{cls:'dt',txt:'piran'}]},
  { id:9, cat:'modern', style:'watercolor', name:'Aquarelle', price:'Zlati',
    art:[{cls:'top',txt:'— Save the date —'},{cls:'nm',txt:'Iva &amp; Tim'},{cls:'dt',txt:'junij 2026'}]},
  { id:10, cat:'modern', style:'promesse', name:'Promesse', price:'Zlati',
    art:[{cls:'top',txt:'— Mariage —'},{cls:'nm',txt:'Sara'},{cls:'amp',txt:'&'},{cls:'nm',txt:'Tilen'},{cls:'dt',txt:'05 · 09 · 2026'}]},
  // luxe
  { id:11, cat:'luxe', style:'noir', name:'Noir Velvet', price:'Platinasti',
    art:[{cls:'top',txt:'WEDDING · 2026'},{cls:'nms',txt:'KAJA<br/>&amp;<br/>BOR'},{cls:'ft',txt:'12 · 06 · LJUBLJANA'}]},
  { id:12, cat:'luxe', style:'nocturne', name:'Nocturne', price:'Platinasti',
    art:[{cls:'top',txt:'— Nocturne —'},{cls:'nm',txt:'Lana'},{cls:'amp',txt:'&'},{cls:'nm',txt:'Vid'},{cls:'dt',txt:'05 · 09 · 2026'}]},
  { id:13, cat:'luxe', style:'venezia', name:'Venezia', price:'Platinasti',
    art:[{cls:'top',txt:'— La Serenissima —'},{cls:'nm',txt:'Irena'},{cls:'amp',txt:'&'},{cls:'nm',txt:'Matic'},{cls:'dt',txt:'settembre 2026'}]},
]

const CAT_COUNTS = { all:13, editorial:3, botanical:3, modern:4, luxe:3 }
type Cat = keyof typeof CAT_COUNTS

// all 13 templates map directly to real /templates/[id] pages
const STYLE_TO_ID: Record<string, string> = {
  riviera: 'riviera',
  heritage: 'heritage',
  eliarose: 'eliarose',
  toscana: 'toscana',
  botanica: 'botanica',
  rosewood: 'rosewood',
  scandi: 'scandi',
  coastal: 'coastal',
  watercolor: 'watercolor',
  promesse: 'promesse',
  noir: 'noir',
  nocturne: 'nocturne',
  venezia: 'venezia',
}

const FIG_NAMES: Record<Locale, string>[] = [
  { sl:'Riviera Edition', en:'Riviera Edition', hr:'Riviera Edition' },
  { sl:'Toscana Botanical', en:'Toscana Botanical', hr:'Toscana Botanical' },
  { sl:'Noir Velvet', en:'Noir Velvet', hr:'Noir Velvet' },
  { sl:'Aquarelle', en:'Aquarelle', hr:'Aquarelle' },
]

function NamePopup({ onConfirm, initialP1, initialP2 }: { onConfirm: (p1: string, p2: string) => void; initialP1?: string; initialP2?: string }) {
  const [v1, setV1] = useState(initialP1 || '')
  const [v2, setV2] = useState(initialP2 || '')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 100) }, [])

  function confirm() { onConfirm(v1.trim() || 'Lorena', v2.trim() || 'Viktor') }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
    >
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ position: 'absolute', inset: 0, background: 'rgba(26,23,20,.55)', backdropFilter: 'blur(8px)' }}
        onClick={confirm}
      />
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 1, background: '#F7F4EF', border: '1px solid #E8E2D9', padding: '52px 44px 44px', maxWidth: 460, width: '100%', textAlign: 'center' }}
      >
        {[
          { top: -3, left: -3, borderRight: 'none', borderBottom: 'none' },
          { top: -3, right: -3, borderLeft: 'none', borderBottom: 'none' },
          { bottom: -3, left: -3, borderRight: 'none', borderTop: 'none' },
          { bottom: -3, right: -3, borderLeft: 'none', borderTop: 'none' },
        ].map((s, i) => (
          <span key={i} style={{ position: 'absolute', width: 14, height: 14, border: '1px solid #8C7B6B', ...s }} />
        ))}
        <div style={{ fontSize: 10, letterSpacing: '.32em', textTransform: 'uppercase', color: '#8C7B6B', fontFamily: 'var(--font-instrument)', marginBottom: 20 }}>
          — Personalizirajta predogled —
        </div>
        <h2 style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 300, fontSize: 'clamp(26px,4vw,34px)', lineHeight: 1.1, color: '#1A1714', marginBottom: 8 }}>
          Kako se imenujeta?
        </h2>
        <p style={{ fontFamily: 'var(--font-fraunces)', fontStyle: 'italic', fontSize: 15, color: '#6e6359', marginBottom: 32, lineHeight: 1.5 }}>
          Vajini imeni se pojavita na predogledih vabil.
        </p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
          <input
            ref={inputRef}
            value={v1}
            onChange={e => setV1(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && confirm()}
            placeholder="Ženin"
            style={{ flex: 1, minWidth: 0, padding: '13px 16px', background: 'transparent', border: '1px solid #E8E2D9', color: '#1A1714', fontFamily: 'var(--font-instrument)', fontSize: 14, outline: 'none' }}
            onFocus={e => (e.target.style.borderColor = '#8C7B6B')}
            onBlur={e => (e.target.style.borderColor = '#E8E2D9')}
          />
          <span style={{ fontFamily: 'var(--font-fraunces)', fontStyle: 'italic', fontSize: 26, color: '#c9a87e', flexShrink: 0, lineHeight: 1 }}>&amp;</span>
          <input
            value={v2}
            onChange={e => setV2(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && confirm()}
            placeholder="Nevesta"
            style={{ flex: 1, minWidth: 0, padding: '13px 16px', background: 'transparent', border: '1px solid #E8E2D9', color: '#1A1714', fontFamily: 'var(--font-instrument)', fontSize: 14, outline: 'none' }}
            onFocus={e => (e.target.style.borderColor = '#8C7B6B')}
            onBlur={e => (e.target.style.borderColor = '#E8E2D9')}
          />
        </div>
        <button
          onClick={confirm}
          style={{ width: '100%', padding: '15px 28px', background: '#1A1714', color: '#F7F4EF', fontFamily: 'var(--font-instrument)', fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', borderRadius: 99, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, border: 'none' }}
        >
          Ustvari predogled
          <svg width="13" height="9" viewBox="0 0 14 10" fill="none"><path d="M0 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.2" /></svg>
        </button>
        <button
          onClick={confirm}
          style={{ marginTop: 14, fontSize: 12, color: '#6e6359', fontFamily: 'var(--font-instrument)', letterSpacing: '.08em', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textDecorationColor: '#E8E2D9' }}
        >
          Preskoči
        </button>
      </motion.div>
    </motion.div>
  )
}

function Arrow() {
  return (
    <svg viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.2" style={{width:14,height:10}}>
      <path d="M0 5h13M9 1l4 4-4 4"/>
    </svg>
  )
}

function FaqItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  return (
    <details className="faq-item" open={defaultOpen}>
      <summary>
        <span>{q}</span>
        <span className="faq-ic" />
      </summary>
      <div className="faq-a">{a}</div>
    </details>
  )
}

export default function HomePage() {
  const locale = useLocale() as Locale
  const tr = T[locale] ?? T.sl

  const [topIdx, setTopIdx] = useState(0)
  const [turningIdx, setTurningIdx] = useState<number | null>(null)
  const [returningIdx, setReturningIdx] = useState<number | null>(null)
  const [cat, setCat] = useState<Cat>('all')
  const [formSent, setFormSent] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [p1, setP1] = useState('Lorena')
  const [p2, setP2] = useState('Viktor')
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const saved1 = sessionStorage.getItem('njd_p1')
    const saved2 = sessionStorage.getItem('njd_p2')
    if (saved1) setP1(saved1)
    if (saved2) setP2(saved2)
    setShowPopup(true)
  }, [])

  function handlePopupConfirm(name1: string, name2: string) {
    setP1(name1); setP2(name2)
    setShowPopup(false)
    sessionStorage.setItem('njd_p1', name1)
    sessionStorage.setItem('njd_p2', name2)
  }

  const topIdxRef = useRef(topIdx)
  topIdxRef.current = topIdx
  const returnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const advance = useCallback(() => {
    const current = topIdxRef.current
    setTurningIdx(current)
    setTopIdx((current + 1) % 4)
    if (returnTimerRef.current) clearTimeout(returnTimerRef.current)
    returnTimerRef.current = setTimeout(() => {
      setTurningIdx(null)
      setReturningIdx(current)
      requestAnimationFrame(() => requestAnimationFrame(() => setReturningIdx(null)))
    }, 950)
  }, [])

  useEffect(() => {
    const id = setInterval(advance, 3800)
    return () => clearInterval(id)
  }, [advance])

  function pos(cardI: number) {
    return (cardI - topIdx + 4) % 4
  }

  const filtered = cat === 'all' ? TMPL : TMPL.filter(tmpl => tmpl.cat === cat)

  const GRAIN = `url("data:image/svg+xml;utf8,<svg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.12 0 0 0 0 0.10 0 0 0 0 0.08 0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`

  return (
    <div className="njd-page">
      {/* grain */}
      <div aria-hidden style={{ position:'fixed', inset:0, zIndex:200, pointerEvents:'none', opacity:.42, mixBlendMode:'multiply' as const, backgroundImage:GRAIN, backgroundSize:'240px 240px' }} />

      {/* ── NAME POPUP ── */}
      <AnimatePresence>
        {showPopup && <NamePopup onConfirm={handlePopupConfirm} initialP1={p1} initialP2={p2} />}
      </AnimatePresence>

      {/* ── NAV ── */}
      <nav className="nav">
        <Link href="/" className="nav__brand">
          <span className="brand-mark">◈</span>
          <span><span className="brand-italic">Najin</span>Dan</span>
          <small>{tr.navTag}</small>
        </Link>
        <div className="nav__links">
          <a href="#benefits">{tr.navBenefits}</a>
          <a href="#how">{tr.navHow}</a>
          <Link href="/templates">{tr.navTemplates}</Link>
          <Link href="/pricing">{tr.navPricing}</Link>
          <a href="#faq">{tr.navFaq}</a>
        </div>
        <div className="nav__right">
          <div className="lang">
            <Link href="/" locale={'sl' as any} className={locale === 'sl' ? 'active' : ''}>SL</Link>
            <span>·</span>
            <Link href="/" locale={'en' as any} className={locale === 'en' ? 'active' : ''}>EN</Link>
            <span>·</span>
            <Link href="/" locale={'hr' as any} className={locale === 'hr' ? 'active' : ''}>HR</Link>
          </div>
          <Link href="/register" className="nav__cta nav__cta--desk">{tr.navCta}</Link>
          <button className={`nav__burger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div className="mob-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mob-panel" onClick={e => e.stopPropagation()}>
            <button className="mob-close" onClick={() => setMenuOpen(false)} aria-label="Zapri">✕</button>
            <div className="mob-links">
              <a href="#benefits" onClick={() => setMenuOpen(false)}>{tr.navBenefits}</a>
              <a href="#how" onClick={() => setMenuOpen(false)}>{tr.navHow}</a>
              <Link href="/templates" onClick={() => setMenuOpen(false)}>{tr.navTemplates}</Link>
              <Link href="/pricing" onClick={() => setMenuOpen(false)}>{tr.navPricing}</Link>
              <a href="#faq" onClick={() => setMenuOpen(false)}>{tr.navFaq}</a>
            </div>
            <div className="mob-lang">
              <Link href="/" locale={'sl' as any} className={locale === 'sl' ? 'active' : ''} onClick={() => setMenuOpen(false)}>SL</Link>
              <span>·</span>
              <Link href="/" locale={'en' as any} className={locale === 'en' ? 'active' : ''} onClick={() => setMenuOpen(false)}>EN</Link>
              <span>·</span>
              <Link href="/" locale={'hr' as any} className={locale === 'hr' ? 'active' : ''} onClick={() => setMenuOpen(false)}>HR</Link>
            </div>
            <Link href="/register" className="cta cta--solid full" onClick={() => setMenuOpen(false)}>
              <span>{tr.navCta}</span>
            </Link>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <header className="hero" id="top">
        <div className="hero__inner">
          <aside className="hero__rail">
            <span className="hero__rail-num">No. 001</span>
            <span className="hero__rail-line" />
            <span className="hero__rail-loc">A&nbsp;DIGITAL&nbsp;INVITATION&nbsp;STUDIO</span>
          </aside>

          <div className="hero__copy">
            <div className="hero__eyebrow">
              <span className="hero__eyebrow-dash" />
              <span>{tr.heroEyebrow}</span>
            </div>
            <h1 className="hero__title">
              {tr.heroTitle1}<br/>
              <em className="ital">{tr.heroTitle2}</em>
            </h1>
            <p className="hero__sub">{tr.heroSub}</p>
            <div className="hero__cta-row">
              <Link href="/register" className="cta cta--solid">
                <span>{tr.heroCtaPrimary}</span>
                <Arrow />
              </Link>
              <a href="#templates" className="cta cta--ghost">
                <span>{tr.heroCtaSecondary}</span>
              </a>
            </div>
            <ul className="hero__proof">
              <li>
                <span className="hero__proof-num ital">600+</span>
                <span className="hero__proof-label">{tr.heroStat1}</span>
              </li>
              <li>
                <span className="hero__proof-num ital">13</span>
                <span className="hero__proof-label">{tr.heroStat2}</span>
              </li>
              <li>
                <span className="hero__proof-num ital">4.9</span>
                <span className="hero__proof-label">{tr.heroStat3}</span>
              </li>
            </ul>
          </div>

          {/* card deck */}
          <div className="hero__stage" aria-hidden>
            <div className="stage-shadow" />
            <div className="card-deck">
              <article className={`invite-card invite-card--riviera${turningIdx === 0 ? ' turning' : ''}${returningIdx === 0 ? ' returning' : ''}`} data-pos={pos(0)}>
                <div className="ic__inner">
                  <span className="ic__corner ic__corner--tl" /><span className="ic__corner ic__corner--tr" />
                  <span className="ic__corner ic__corner--bl" /><span className="ic__corner ic__corner--br" />
                  <div className="ic__eyebrow">— SAVE THE DATE —</div>
                  <div className="ic__couple">
                    <span>{p1}</span><span className="ic__amp">&amp;</span><span>{p2}</span>
                  </div>
                  <div className="ic__rule" />
                  <div className="ic__meta">
                    <div><span className="lab">DATUM</span><span className="val ital">12 · 06 · 2026</span></div>
                    <div><span className="lab">URA</span><span className="val ital">16:30</span></div>
                    <div><span className="lab">KRAJ</span><span className="val ital">Rovinj · Istra</span></div>
                  </div>
                  <div className="ic__foot">No. 01 · RSVP do 01.05.2026</div>
                </div>
              </article>

              <article className={`invite-card invite-card--botanical${turningIdx === 1 ? ' turning' : ''}${returningIdx === 1 ? ' returning' : ''}`} data-pos={pos(1)}>
                <div className="ic__inner">
                  <svg className="bot-flora" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
                    <path d="M50 76 V30"/><path d="M50 42 C40 36 30 34 24 26 C32 32 42 38 50 40"/>
                    <path d="M50 36 C60 30 70 28 76 20 C68 28 60 32 50 34"/>
                    <path d="M50 28 C42 22 38 20 32 14 C40 20 44 22 50 26"/>
                    <ellipse cx="50" cy="18" rx="5" ry="8"/>
                  </svg>
                  <div className="bot-name ital">{p1} &amp; {p2}</div>
                  <div className="bot-sub">— vabita na svojo poroko —</div>
                  <div className="bot-date">12 · 06 · 26</div>
                </div>
              </article>

              <article className={`invite-card invite-card--noir${turningIdx === 2 ? ' turning' : ''}${returningIdx === 2 ? ' returning' : ''}`} data-pos={pos(2)}>
                <div className="ic__inner">
                  <div className="noir-top">— W E D D I N G · 2026 —</div>
                  <div className="noir-couple">
                    <span>{p1.toUpperCase()}</span>
                    <em className="noir-amp">&#38;</em>
                    <span>{p2.toUpperCase()}</span>
                  </div>
                  <div className="noir-foot">12 · 06 · 2026 · ROVINJ</div>
                </div>
              </article>

              <article className={`invite-card invite-card--watercolor${turningIdx === 3 ? ' turning' : ''}${returningIdx === 3 ? ' returning' : ''}`} data-pos={pos(3)}>
                <div className="ic__inner">
                  <div className="wc-top">— Save the date —</div>
                  <div className="wc-couple">{p1}<span className="wc-amp ital">&amp;</span>{p2}</div>
                  <div className="wc-date ital">12. junij 2026</div>
                </div>
              </article>
            </div>

            <div className="stage-caption">
              <span className="ital">Fig. {String(topIdx + 1).padStart(2, '0')}</span>
              <span className="dot">·</span>
              <span>{FIG_NAMES[topIdx][locale]}</span>
            </div>
            <div className="stage-dots">
              {[0,1,2,3].map(i => (
                <button
                  key={i}
                  className={topIdx === i ? 'active' : ''}
                  onClick={() => {
                    if (i === topIdx) return
                    const prev = topIdxRef.current
                    setTurningIdx(prev)
                    setTopIdx(i)
                    if (returnTimerRef.current) clearTimeout(returnTimerRef.current)
                    returnTimerRef.current = setTimeout(() => {
                      setTurningIdx(null)
                      setReturningIdx(prev)
                      requestAnimationFrame(() => requestAnimationFrame(() => setReturningIdx(null)))
                    }, 950)
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="hero__strip">
          <span>{tr.strip1}</span><span className="dot">·</span>
          <span>{tr.strip2}</span><span className="dot">·</span>
          <span>{tr.strip3}</span><span className="dot">·</span>
          <span>{tr.strip4}</span><span className="dot">·</span>
          <span>{tr.strip5}</span><span className="dot">·</span>
          <span>{tr.strip6}</span>
        </div>
      </header>

      {/* ── BENEFITS ── */}
      <section className="sec" id="benefits">
        <div className="sec__head">
          <div className="label">{tr.benEyebrow}</div>
          <h2 className="sec__title"><span>{tr.benTitle1}</span><br/><em className="ital">{tr.benTitle2}</em></h2>
          <p className="sec__sub">{tr.benSub}</p>
        </div>
        <div className="benefits-grid">
          {(['i.','ii.','iii.','iv.','v.','vi.'] as const).map((num, i) => {
            const idx = i + 1
            const title = tr[`b${idx}t` as keyof typeof tr] as string
            const body  = tr[`b${idx}p` as keyof typeof tr] as string
            return (
              <article className="benefit" key={num}>
                <span className="benefit__num">{num}</span>
                <h3 className="benefit__t">{title}</h3>
                <p className="benefit__p">{body}</p>
              </article>
            )
          })}
        </div>
      </section>

      {/* ── HOW ── */}
      <section className="sec sec--alt" id="how">
        <div className="sec__head">
          <div className="label">{tr.howEyebrow}</div>
          <h2 className="sec__title"><span>{tr.howTitle1}</span><br/><em className="ital">{tr.howTitle2}</em></h2>
        </div>
        <div className="how-grid">
          {([['01','how1t','how1p'],['02','how2t','how2p'],['03','how3t','how3p']] as const).map(([num, tk, pk]) => (
            <article className="how" key={num}>
              <div className="how__num">{num}</div>
              <div className="how__rule" />
              <h3 className="how__t">{tr[tk]}</h3>
              <p className="how__p">{tr[pk]}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── TEMPLATES ── */}
      <section className="sec" id="templates">
        <div className="sec__head sec__head--row">
          <div>
            <div className="label">{tr.tplEyebrow}</div>
            <h2 className="sec__title"><span>{tr.tplTitle1}</span><br/><em className="ital">{tr.tplTitle2}</em></h2>
          </div>
          <p className="sec__sub sec__sub--right">{tr.tplSub}</p>
        </div>

        <div className="tpl-tabs">
          {(Object.keys(CAT_COUNTS) as Cat[]).map(c => {
            const labelKey = `cat${c.charAt(0).toUpperCase() + c.slice(1)}` as keyof typeof tr
            return (
              <button key={c} className={`tpl-tab${cat === c ? ' active' : ''}`} onClick={() => setCat(c)}>
                {tr[labelKey]} <span className="ct">{CAT_COUNTS[c]}</span>
              </button>
            )
          })}
        </div>

        <div className="tpl-grid">
          {filtered.map(tmpl => {
            const tplId = STYLE_TO_ID[tmpl.style]
            const tplHref = tplId ? `/templates/${tplId}` : '/templates'
            return (
            <Link key={tmpl.id} href={tplHref as any} className="tpl-card">
              <div className="tpl-frame">
                <div
                  className={`tpl-art ta-${tmpl.style}`}
                  dangerouslySetInnerHTML={{ __html: tmpl.art.map(a => `<div class="${a.cls}">${a.txt}</div>`).join('') }}
                />
              </div>
              <div className="tpl-meta">
                <div>
                  <div className="tpl-cat">{tmpl.cat}</div>
                  <div className="tpl-name">{tmpl.name}</div>
                </div>
                <div className="tpl-price ital">{tmpl.price}</div>
              </div>
            </Link>
          )})}
        </div>

        <div className="tpl-foot">
          <p>{tr.tplFoot}</p>
          <a href="#contact" className="cta cta--solid"><span>{tr.tplCtaCustom}</span><Arrow /></a>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="sec sec--alt" id="gallery">
        <div className="sec__head">
          <div className="label">{tr.galEyebrow}</div>
          <h2 className="sec__title"><span>{tr.galTitle1}</span><br/><em className="ital">{tr.galTitle2}</em></h2>
          <p className="sec__sub">{tr.galSub}</p>
        </div>
        <div className="gal-grid">
          <figure className="gal" style={{ gridArea: 'bled' }}>
            <Image src={imgBled} alt="Sara & Tilen · Bled" fill style={{ objectFit:'cover', objectPosition:'center 40%' }} sizes="(max-width:768px) 50vw, 25vw" />
            <figcaption>S &amp; T · Bled · 09.2025</figcaption>
          </figure>
          <figure className="gal" style={{ gridArea: 'ceremony' }}>
            <Image src={imgCeremony} alt="Obredi" fill style={{ objectFit:'cover' }} sizes="(max-width:768px) 50vw, 25vw" />
            <figcaption>Obredi · 05.2025</figcaption>
          </figure>
          <figure className="gal" style={{ gridArea: 'istria' }}>
            <Image src={imgIstria} alt="Ana & Marko · Istra" fill style={{ objectFit:'cover', objectPosition:'center 35%' }} sizes="(max-width:768px) 100vw, 50vw" />
            <figcaption>A &amp; M · Istra · 06.2026</figcaption>
          </figure>
          <figure className="gal" style={{ gridArea: 'rovinj' }}>
            <Image src={imgRovinj} alt="Lorena & Viktor · Rovinj" fill style={{ objectFit:'cover', objectPosition:'center 30%' }} sizes="(max-width:768px) 100vw, 50vw" />
            <figcaption>L &amp; V · Rovinj · 06.2026</figcaption>
          </figure>
          <figure className="gal" style={{ gridArea: 'table' }}>
            <Image src={imgTable} alt="Detajli" fill style={{ objectFit:'cover' }} sizes="(max-width:768px) 50vw, 25vw" />
            <figcaption>Detajli · 08.2025</figcaption>
          </figure>
          <figure className="gal" style={{ gridArea: 'vineyard' }}>
            <Image src={imgVineyard} alt="Maja & Luka · Brda" fill style={{ objectFit:'cover', objectPosition:'center 20%' }} sizes="(max-width:768px) 100vw, 50vw" />
            <figcaption>M &amp; L · Brda · 09.2025</figcaption>
          </figure>
          <figure className="gal" style={{ gridArea: 'dance' }}>
            <Image src={imgFirstDance} alt="Prvi ples" fill style={{ objectFit:'cover', objectPosition:'center top' }} sizes="(max-width:768px) 50vw, 25vw" />
            <figcaption>Prvi ples · 2025</figcaption>
          </figure>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="sec" id="testimonials">
        <div className="sec__head">
          <div className="label">{tr.testEyebrow}</div>
          <h2 className="sec__title"><span>{tr.testTitle1}</span><br/><em className="ital">{tr.testTitle2}</em></h2>
        </div>
        <div className="test-grid">
          {([
            [tr.test1q, tr.test1name, tr.test1meta],
            [tr.test2q, tr.test2name, tr.test2meta],
            [tr.test3q, tr.test3name, tr.test3meta],
          ] as const).map(([q, name, meta]) => (
            <figure className="test" key={meta}>
              <div className="test__mark">&ldquo;</div>
              <blockquote>{q}</blockquote>
              <figcaption>
                <span className="test__name ital">{name}</span>
                <span className="test__meta">{meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="test-strip">
          <span className="ital">★ ★ ★ ★ ★</span>
          <span>{tr.testRating}</span>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="sec sec--alt" id="pricing">
        <div className="sec__head">
          <div className="label">{tr.priceEyebrow}</div>
          <h2 className="sec__title"><span>{tr.priceTitle1}</span><br/><em className="ital">{tr.priceTitle2}</em></h2>
          <p className="sec__sub">{tr.priceSub}</p>
        </div>

        <div className="price-grid">
          {/* Bronze */}
          <article className="price-card">
            <header>
              <div className="label">{tr.p1tier}</div>
              <h3 className="price-card__t">{tr.p1t1} <em>{tr.p1t2}</em> {tr.p1t3}</h3>
            </header>
            <div className="price-card__price">
              <span className="cur">€</span><span className="num">69</span>
              <span className="per ital">{tr.priceOnce}</span>
            </div>
            <ul className="price-card__list">
              <li>{tr.p1l1}</li><li>{tr.p1l2}</li><li>{tr.p1l3}</li><li>{tr.p1l4}</li>
              <li>{tr.p1l5}</li><li className="muted">{tr.p1l6}</li><li className="muted">{tr.p1l7}</li>
            </ul>
            <Link href={`/register?package=bronze` as any} className="cta cta--ghost full">{tr.p1cta}</Link>
            <p className="price-card__note ital">{tr.p1note}</p>
          </article>

          {/* Gold */}
          <article className="price-card price-card--featured">
            <div className="featured-badge">
              <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l2 4 5 .7-3.6 3.5.9 5L8 11.7 3.7 14.2l.9-5L1 5.7 6 5z"/></svg>
              {tr.priceFeatured}
            </div>
            <header>
              <div className="label">{tr.p2tier}</div>
              <h3 className="price-card__t">{tr.p2t1} <em>{tr.p2t2}</em> {tr.p2t3}</h3>
            </header>
            <div className="price-card__price">
              <span className="cur">€</span><span className="num">89</span>
              <span className="per ital">{tr.priceOnce}</span>
            </div>
            <ul className="price-card__list">
              <li>{tr.p2l1}</li><li>{tr.p2l2}</li><li>{tr.p2l3}</li><li>{tr.p2l4}</li>
              <li>{tr.p2l5}</li><li>{tr.p2l6}</li><li>{tr.p2l7}</li><li>{tr.p2l8}</li>
            </ul>
            <Link href={`/register?package=gold` as any} className="cta cta--solid full">{tr.p2cta}</Link>
            <p className="price-card__note ital">{tr.p2note}</p>
          </article>

          {/* Platinum */}
          <article className="price-card">
            <header>
              <div className="label">{tr.p3tier}</div>
              <h3 className="price-card__t">{tr.p3t1} <em>{tr.p3t2}</em></h3>
            </header>
            <div className="price-card__price">
              <span className="cur">€</span><span className="num">119</span>
              <span className="per ital">{tr.priceOnce}</span>
            </div>
            <ul className="price-card__list">
              <li>{tr.p3l1}</li><li>{tr.p3l2}</li><li>{tr.p3l3}</li><li>{tr.p3l4}</li>
              <li>{tr.p3l5}</li><li>{tr.p3l6}</li><li>{tr.p3l7}</li><li>{tr.p3l8}</li>
            </ul>
            <a href="#contact" className="cta cta--ghost full">{tr.p3cta}</a>
            <p className="price-card__note ital">{tr.p3note}</p>
          </article>
        </div>

        {/* Custom banner */}
        <div className="custom-banner">
          <div className="custom-banner__big" aria-hidden>&amp;</div>
          <div className="custom-banner__l">
            <div className="label">{tr.custEyebrow}</div>
            <h3 className="custom-banner__t">{tr.custT1}<br/><em className="ital">{tr.custT2}</em></h3>
            <p className="custom-banner__p">{tr.custP}</p>
            <ul className="custom-banner__list">
              <li>{tr.custL1}</li><li>{tr.custL2}</li>
              <li>{tr.custL3}</li><li>{tr.custL4}</li>
            </ul>
          </div>
          <div className="custom-banner__r">
            <div className="custom-quote ital">{tr.custQuote}</div>
            <a href="#contact" className="cta cta--inverted"><span>{tr.custCta}</span><Arrow /></a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sec" id="faq">
        <div className="sec__head">
          <div className="label">{tr.faqEyebrow}</div>
          <h2 className="sec__title"><span>{tr.faqTitle1}</span><br/><em className="ital">{tr.faqTitle2}</em></h2>
        </div>
        <div className="faq-list">
          <FaqItem q={tr.faq1q} a={tr.faq1a} defaultOpen />
          <FaqItem q={tr.faq2q} a={tr.faq2a} />
          <FaqItem q={tr.faq3q} a={tr.faq3a} />
          <FaqItem q={tr.faq4q} a={tr.faq4a} />
          <FaqItem q={tr.faq5q} a={tr.faq5a} />
          <FaqItem q={tr.faq6q} a={tr.faq6a} />
          <FaqItem q={tr.faq7q} a={tr.faq7a} />
          <FaqItem q={tr.faq8q} a={tr.faq8a} />
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="sec sec--alt" id="contact">
        <div className="contact">
          <div className="contact__l">
            <div className="label">{tr.ctEyebrow}</div>
            <h2 className="contact__t">{tr.ctT1}<br/><em className="ital">{tr.ctT2}</em></h2>
            <p className="contact__p">{tr.ctP}</p>
            <div className="contact__lines">
              <div className="contact-row"><span className="contact-row__k">{tr.ctEmail}</span><span className="contact-row__v ital">info@gudweb.si</span></div>
              <div className="contact-row"><span className="contact-row__k">{tr.ctPhone}</span><span className="contact-row__v ital">+386 40 259 309</span></div>
              <div className="contact-row"><span className="contact-row__k">{tr.ctStudio}</span><span className="contact-row__v ital">Ljubljana · Zagreb · Rovinj</span></div>
              <div className="contact-row"><span className="contact-row__k">{tr.ctHours}</span><span className="contact-row__v ital">{tr.ctHoursVal}</span></div>
            </div>
          </div>

          <form className={`contact__form${formSent ? ' sent' : ''}`} onSubmit={e => { e.preventDefault(); setFormSent(true) }}>
            <div className="form-row form-row--split">
              <label><span>{tr.fName}</span><input type="text" placeholder="Lorena & Viktor" required /></label>
              <label><span>{tr.fEmail}</span><input type="email" placeholder="lorena@example.com" required /></label>
            </div>
            <div className="form-row form-row--split">
              <label><span>{tr.fDate}</span><input type="text" placeholder="12. junij 2026" /></label>
              <label>
                <span>{tr.fPackage}</span>
                <select>
                  <option>{tr.fOpt0}</option>
                  <option>{tr.fOpt1}</option>
                  <option>{tr.fOpt2}</option>
                  <option>{tr.fOpt3}</option>
                  <option>{tr.fOpt4}</option>
                  <option>{tr.fOpt5}</option>
                </select>
              </label>
            </div>
            <label className="form-row">
              <span>{tr.fMsg}</span>
              <textarea rows={5} placeholder="Povejta nama nekaj besed o vajini ideji ..." />
            </label>
            <button type="submit" className="cta cta--solid full"><span>{tr.fSend}</span><Arrow /></button>
            <p className="form-fine">{tr.fFine}</p>
            <div className="form-sent">
              <div className="ital">{tr.fSentT}</div>
              <p>{tr.fSentP}</p>
            </div>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="foot">
        <div className="foot__top">
          <div className="foot__brand">
            <span className="brand-mark">◈</span>
            <span><span className="brand-italic">Najin</span>Dan</span>
          </div>
          <p className="foot__tag">{tr.footTag}</p>
        </div>
        <div className="foot__grid">
          <div className="foot__col">
            <h5>{tr.footProduct}</h5>
            <Link href="/templates">{tr.footL1}</Link>
            <Link href="/pricing">{tr.footL2}</Link>
            <a href="#how">{tr.footL3}</a>
            <a href="#faq">{tr.footL4}</a>
          </div>
          <div className="foot__col">
            <h5>{tr.footStudio}</h5>
            <a href="#contact">{tr.footL5}</a>
            <a href="#contact">{tr.footL6}</a>
            <a href="#gallery">{tr.footL7}</a>
            <a href="#contact">{tr.footL8}</a>
          </div>
          <div className="foot__col">
            <h5>{tr.footLegal}</h5>
            <Link href="/terms">{tr.footL9}</Link>
            <Link href="/privacy">{tr.footL10}</Link>
            <a href="#">{tr.footL11}</a>
            <a href="#">{tr.footL12}</a>
          </div>
          <div className="foot__col">
            <h5>{tr.footContact}</h5>
            <a href="mailto:info@gudweb.si">info@gudweb.si</a>
            <a href="tel:+38640259309">+386 40 259 309</a>
            <span style={{opacity:.7}}>Ljubljana · Zagreb</span>
          </div>
        </div>
        <div className="foot__bot">
          <span>{tr.footCopy}</span>
          <span className="ital">Vol. I · Issue 26 · Spring / Summer</span>
        </div>
      </footer>

      {/* ── FLOATING NAME BUTTON ── */}
      <AnimatePresence>
        {!showPopup && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowPopup(true)}
            style={{
              position: 'fixed', bottom: 24, right: 24, zIndex: 100,
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 18px',
              background: 'rgba(26,23,20,.92)', color: '#F7F4EF',
              backdropFilter: 'blur(8px)',
              borderRadius: 99, border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-instrument)', fontSize: 11.5, letterSpacing: '0.12em',
              boxShadow: '0 8px 32px rgba(26,23,20,.35)',
            }}
          >
            <span style={{ color: '#8C7B6B', fontSize: 14 }}>◈</span>
            <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-fraunces)' }}>{p1}</span>
            <span style={{ color: '#8C7B6B', fontSize: 12 }}>&amp;</span>
            <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-fraunces)' }}>{p2}</span>
            <span style={{ color: '#6e6359', fontSize: 10, letterSpacing: '0.18em', marginLeft: 4 }}>✎</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
