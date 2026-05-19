'use client'

import './classic.css'
import { useState, useEffect, useCallback } from 'react'
import { useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'

/* ─── translations ─── */
const T = {
  sl: {
    navTag:'VABILA · EST 2024',navBenefits:'Prednosti',navHow:'Kako deluje',navTemplates:'Vabila',navPricing:'Paketi',navFaq:'Vprašanja',navCta:'Začni',
    heroEyebrow:'Digitalna poročna vabila · Slovenija & Hrvaška',heroTitle1:'Vajin dan,',heroTitle2:'v eni povezavi.',
    heroSub:'Eleganten, popolnoma personaliziran spletni vabilnik — z RSVP, programom dneva, lokacijo, glasbenimi željami in galerijo. Brez papirja, brez izgubljenih kuvert.',
    heroCtaPrimary:'Ustvari vabilo',heroCtaSecondary:'Poglej 20 dizajnov',
    heroStat1:'izdelanih vabil',heroStat2:'do oddaje vabila',heroStat3:'povprečna ocena',
    figRiviera:'Riviera Edition',figBotanical:'Toscana Botanical',figNoir:'Noir Velvet',figWatercolor:'Aquarelle',
    strip1:'Vse na enem mestu',strip2:'RSVP v živo',strip3:'Lastna domena',strip4:'Brez naročnine',strip5:'Slovenščina · English · Hrvatski',strip6:'Online v 48 urah',
    benEyebrow:'— Zakaj digitalno —',benTitle1:'Vse, kar lahko papir,',benTitle2:'in še mnogo več.',benSub:'En sam vabilnik za celo zgodbo. Goste posodobiš v sekundi, oni pa odgovorijo z enim klikom — kjerkoli na svetu.',
    b1t:'Vse na enem mestu',b1p:'Vabilo, program, lokacija, registry in foto galerija — eno polje za posodobitev, in vsi gostje vidijo novo.',
    b2t:'RSVP v živo',b2p:'Gostje potrdijo prihod z enim klikom. Izbirajo med jedmi, dodajo pesem za parket, sporočijo alergije.',
    b3t:'Trije jeziki',b3p:'Slovenščina, angleščina in hrvaščina — gostje pristanejo na svoji jezikovni različici samodejno.',
    b4t:'Brez papirja',b4p:'Brez tiskarne, brez znamk, brez izgubljenih kuvert. Bolj prijazno do okolja in do vajinega proračuna.',
    b5t:'Lastna domena',b5p:'lorena-in-viktor.si ali poljubna vajina domena. Spomin, ki ostane tudi po veliki noči.',
    b6t:'Online v 48 urah',b6p:'Pošljita podatke, midva poskrbiva za vse — vabilo je živo v dveh dneh. Spremembe brez doplačila.',
    howEyebrow:'— Postopek —',howTitle1:'Trije koraki',howTitle2:'do vajinega vabila.',
    how1t:'Izberita dizajn',how1p:'Prebrskajta 20 dizajnov ali zaprosita za nekaj povsem po meri. Tudi po izbiri se vse — barve, pisava, foto — še da prilagajati.',
    how2t:'Pošljita podatke',how2p:'Skupaj izpolniva besedila, datum, lokacijo in vse drobne posebnosti. Naložita najini fotografiji ali izberita iz najinega arhiva.',
    how3t:'Vabilo je živo',how3p:'V 48 urah dobita povezavo, ki jo pošljeta gostom. Spremembe lahko vedno opraviva midva, ali pa jih onadva sama prek admin sučelja.',
    tplEyebrow:'— Naša kolekcija —',tplTitle1:'Dvajset dizajnov,',tplTitle2:'en savršeni dan.',tplSub:'Skrbno izbrani templati — od minimalnih do raskošnih. Vsak dizajn lahko prilagodita po vajinih barvah in tipografiji.',
    catAll:'Vsi',catEditorial:'Editorial',catBotanical:'Botanično',catModern:'Moderno',catLuxe:'Luxe',
    tplFoot:'Vse predloge so popolnoma personalizirane. Tipografija, barve, fotografije in besedila — vse prilagojeno vajini zgodbi.',tplCtaCustom:'Želita custom dizajn?',
    galEyebrow:'— Spomini —',galTitle1:'Pravi pari,',galTitle2:'pravi trenutki.',galSub:'Drobci dni, ki smo jih pomagali pripraviti. Hvala parom, ki so delili svoje fotografije.',
    testEyebrow:'— Pari pravijo —',testTitle1:'Najlepši',testTitle2:'odzivi.',
    test1q:'Vabilo je bilo najlepša stvar na vsem najinem dnevu — še preden se je sploh začel. Gostje so naju klicali, kako čudovito je.',test1meta:'Rovinj · 06.2026',test1name:'Lorena & Viktor',
    test2q:'Trije jeziki, RSVP, zemljevid, glasba — vse ena povezava. Gostje iz tujine so prvič dejansko vedeli, kdaj kam in kako.',test2meta:'Bled · 09.2025',test2name:'Sara & Tilen',
    test3q:'Dva tedna pred poroko smo morali zamenjati lokacijo. Eno sporočilo studiu, pol ure kasneje je bilo posodobljeno za 180 gostov.',test3meta:'Piran · 07.2025',test3name:'Ana & Marko',
    testRating:'4.9 / 5 povprečna ocena',testCount:'na osnovi 187 ocen parov',
    priceEyebrow:'— Paketi —',priceTitle1:'Lepota,',priceTitle2:'brez kompromisa.',priceSub:'Trije paketi za večino parov. Če vaša zgodba zahteva več, naredimo nekaj povsem po meri.',priceOnce:'enkratno',priceFeatured:'Najpopularnejši',
    p1tier:'Brončani',p1t1:'Za',p1t2:'intimne',p1t3:'proslave.',p1l1:'Eno vabilo + RSVP forma',p1l2:'Odštevanje v živo',p1l3:'Galerija do 12 fotografij',p1l4:'Lokacija & zemljevid',p1l5:'3 dizajnerske različice',p1l6:'Personalizacija barv',p1l7:'Lastna domena',p1cta:'Izberi Brončanega',p1note:'Aktivno 6 mesecev',
    p2tier:'Zlati',p2t1:'Najboljša',p2t2:'izbira',p2t3:'za večino parov.',p2l1:'Vse iz Brončanega paketa',p2l2:'Neomejeno fotografij',p2l3:'Naša zgodba + program dneva',p2l4:'Personalizacija barv & pisav',p2l5:'Lastna domena (.si / .com)',p2l6:'Izbira jedi v RSVP-u',p2l7:'3 jeziki samodejno',p2l8:'Podpora do dneva poroke',p2cta:'Izberi Zlatega',p2note:'Aktivno 12 mesecev',
    p3tier:'Platinasti',p3t1:'Popolnoma',p3t2:'po meri.',p3l1:'Vse iz Zlatega paketa',p3l2:'Custom dizajn od nule',p3l3:'Več podstrani + zgodba',p3l4:'Custom animacije & prehodi',p3l5:'2 kroga revizij',p3l6:'Personalni vodja projekta',p3l7:'Online album po poroki',p3l8:'Aktivno 24 mesecev',p3cta:'Izberi Platinastega',p3note:'Najdaljša aktivnost',
    custEyebrow:'— White Glove · brez templejtov —',custT1:'Ne najdeta svojega okusa?',custT2:'Naredimo ga skupaj.',custP:'Naš studio izdela vajino spletno vabilo od bele strani — vajini brendi, vajine barve, vajine animacije, vajina pisava. Brez kompromisov.',
    custL1:'Custom dizajn studio',custL2:'Animacije & 3D efekti',custL3:'Trije jeziki',custL4:'Live streaming integracija',
    custQuote:'"Vajina priča je premočna za polje s 99-tih izbir. Pišita nama."',custCta:'Zaprosi za ponudbo',
    faqEyebrow:'— Pogosta vprašanja —',faqTitle1:'Vse, kar parje',faqTitle2:'običajno vprašajo.',
    faq1q:'Kako hitro je vabilo živo?',faq1a:'Brončani paket je živ v 48 urah po prejemu vajinih podatkov. Zlati v 3 — 5 delovnih dneh. Platinasti (custom dizajn) traja 2 — 3 tedne, ker vključuje konzultacije in revizije z najinim studijem.',
    faq2q:'Lahko sama urejava vsebino po objavi?',faq2a:'Da. Vsi paketi vključujejo preprost admin sučelje, kjer lahko dodajata fotografije, posodobita program in spremljata RSVP odgovore — brez tehničnega znanja.',
    faq3q:'Kaj se zgodi z vabilom po poroki?',faq3a:'Vabilo ostane živo glede na paket — od 6 do 24 mesecev. Po izteku lahko stran shranite kot PDF spominek ali jo podaljšate za 24€ na leto.',
    faq4q:'Kateri jeziki so podprti?',faq4a:'Privzeto slovenščina, angleščina in hrvaščina. V Platinastem paketu lahko dodamo poljuben jezik (italijanščina, nemščina, srbščina, francoščina ...).',
    faq5q:'Kaj če potrebujeva nujno spremembo zadnji teden?',faq5a:'Tudi mesec dni pred poroko sva vama na voljo. Manjše spremembe (datum, ura, jed) sta naredita sama; večje (lokacija, dizajn) opravimo midva v par urah.',
    faq6q:'Kako poteka plačilo?',faq6a:'Plačilo z bančnim nakazilom ali kartico. Brončani in Zlati v eni transakciji, Platinasti razdelimo na dve (50% ob naročilu, 50% ob predaji).',
    faq7q:'Ali lahko vabilo natisnem za starejše goste?',faq7a:'Da, v Zlatem in Platinastem paketu pripravimo PDF različico za tisk, formatiran v A5 ali kvadratu — popolnoma usklajen z digitalno različico.',
    faq8q:'Kaj če imava že fotografa, ki bo posnel material?',faq8a:'Odlično. Naložita fotografije neposredno v admin in midva poskrbiva za retuširanje in optimizacijo, da hitro deluje na vseh napravah.',
    ctEyebrow:'— Pišita nama —',ctT1:'Imata vprašanje',ctT2:'o vajinem vabilu?',ctP:'Pišita nama nekaj besed o vajini ideji — datumu, številu gostov, želenem stilu. Odgovorim osebno v 24 urah.',
    ctEmail:'E-pošta',ctPhone:'Telefon',ctStudio:'Studio',ctHours:'Odzivni čas',ctHoursVal:'običajno do 24 h',
    fName:'Vajina imena',fEmail:'E-pošta',fDate:'Datum poroke',fPackage:'Zanima naju',fMsg:'Sporočilo',fSend:'Pošlji povpraševanje',
    fOpt0:'— Izberita paket —',fOpt1:'Brončani · 60€',fOpt2:'Zlati · 99€',fOpt3:'Platinasti · 150€',fOpt4:'Custom — po meri',fOpt5:'Še se nisva odločila',
    fFine:'Z oddajo se strinjata, da vaju lahko midva kontaktirava. Brez spama, brez novičnikov.',fSentT:'Hvala!',fSentP:'Sporočilo je oddano. Oglasim se najkasneje v 24 urah.',
    footTag:'Eleganten digitalni vabilnik za par, ki si želi, da se njun dan pomni — tudi na spletu.',
    footProduct:'Storitev',footStudio:'Studio',footLegal:'Pravno',footContact:'Kontakt',
    footL1:'Vabila',footL2:'Paketi',footL3:'Kako deluje',footL4:'Vprašanja',footL5:'Kontakt',footL6:'O nama',footL7:'Galerija parov',footL8:'Blog',footL9:'Pogoji',footL10:'Zasebnost',footL11:'Piškotki',footL12:'GDPR',
    footCopy:'© 2026 NajinDan · Made with care in Ljubljana',
  },
  en: {
    navTag:'INVITATIONS · EST 2024',navBenefits:'Why',navHow:'How it works',navTemplates:'Designs',navPricing:'Packages',navFaq:'FAQ',navCta:'Begin',
    heroEyebrow:'Digital wedding invitations · Slovenia & Croatia',heroTitle1:'Your day,',heroTitle2:'in one link.',
    heroSub:'An elegant, fully personalised online invitation — with RSVP, schedule, location, song requests and a gallery. No paper, no lost envelopes.',
    heroCtaPrimary:'Create your invitation',heroCtaSecondary:'Browse 20 designs',
    heroStat1:'invitations crafted',heroStat2:'to go live',heroStat3:'average rating',
    figRiviera:'Riviera Edition',figBotanical:'Toscana Botanical',figNoir:'Noir Velvet',figWatercolor:'Aquarelle',
    strip1:'All in one place',strip2:'Live RSVP',strip3:'Custom domain',strip4:'No subscription',strip5:'Slovenian · English · Croatian',strip6:'Online in 48 hours',
    benEyebrow:'— Why digital —',benTitle1:'Everything paper can do,',benTitle2:'and a great deal more.',benSub:'One invitation for the whole story. Update your guests in a second; they reply in one click — anywhere in the world.',
    b1t:'All in one place',b1p:'Invitation, programme, location, registry and photo gallery — one field to edit, and every guest sees the new version.',
    b2t:'Live RSVP',b2p:'Guests confirm in one click. They pick a menu option, request a song for the floor, flag allergies.',
    b3t:'Three languages',b3p:'Slovenian, English and Croatian — guests land on their own language automatically.',
    b4t:'No paper',b4p:'No printer, no stamps, no lost envelopes. Kinder to the planet and to your budget.',
    b5t:'Custom domain',b5p:'lorena-and-viktor.com or whatever your story calls for. A memory that lives on after the big day.',
    b6t:'Live in 48 hours',b6p:'Send us your details, we do the rest — your invitation is live in two days. Changes any time, no extra fees.',
    howEyebrow:'— The process —',howTitle1:'Three steps',howTitle2:'to your invitation.',
    how1t:'Pick a design',how1p:'Browse our 20 designs or ask for something bespoke. Either way, colours, type and photos are still yours to fine-tune.',
    how2t:'Send your details',how2p:'Together we fill in the words, date, location and every little detail. Upload your photos or choose from our archive.',
    how3t:'Your invitation goes live',how3p:'Within 48 hours you get a link to send to your guests. Edit it later via the studio or your own admin panel.',
    tplEyebrow:'— The collection —',tplTitle1:'Twenty designs,',tplTitle2:'one perfect day.',tplSub:'Carefully curated templates — from quiet minimalism to full opulence. Each design adapts to your colours and your typography.',
    catAll:'All',catEditorial:'Editorial',catBotanical:'Botanical',catModern:'Modern',catLuxe:'Luxe',
    tplFoot:'Every template is fully personalised. Type, colour, photography and copy — all tuned to your story.',tplCtaCustom:'Want something fully bespoke?',
    galEyebrow:'— Memories —',galTitle1:'Real couples,',galTitle2:'real moments.',galSub:'Fragments of days we helped prepare. Thanks to the couples who shared their photographs with us.',
    testEyebrow:'— Couples say —',testTitle1:'The kindest',testTitle2:'reviews.',
    test1q:'The invitation was the loveliest thing about our day — before the day even began. Guests rang to tell us how stunning it was.',test1meta:'Rovinj · 06.2026',test1name:'Lorena & Viktor',
    test2q:'Three languages, RSVP, the map, the music — all one link. For the first time our guests from abroad knew exactly when, where and how.',test2meta:'Bled · 09.2025',test2name:'Sara & Tilen',
    test3q:'Two weeks before the wedding we had to change venues. One message to the studio, half an hour later it was updated for 180 guests.',test3meta:'Piran · 07.2025',test3name:'Ana & Marko',
    testRating:'4.9 / 5 average rating',testCount:'based on 187 couple reviews',
    priceEyebrow:'— Packages —',priceTitle1:'Beauty,',priceTitle2:'with no compromise.',priceSub:'Three packages for most couples. If your story needs more, we craft something fully bespoke.',priceOnce:'one-off',priceFeatured:'Most popular',
    p1tier:'Bronze',p1t1:'For',p1t2:'intimate',p1t3:'celebrations.',p1l1:'One invitation + RSVP form',p1l2:'Live countdown',p1l3:'Gallery up to 12 photos',p1l4:'Location & map',p1l5:'3 design variants',p1l6:'Colour personalisation',p1l7:'Custom domain',p1cta:'Choose Bronze',p1note:'Active 6 months',
    p2tier:'Gold',p2t1:'The best',p2t2:'choice',p2t3:'for most couples.',p2l1:'Everything in Bronze',p2l2:'Unlimited photos',p2l3:'Our story + day schedule',p2l4:'Colour & typography control',p2l5:'Custom domain (.si / .com)',p2l6:'Menu choice in RSVP',p2l7:'3 languages, automatic',p2l8:'Support up to the wedding',p2cta:'Choose Gold',p2note:'Active 12 months',
    p3tier:'Platinum',p3t1:'Fully',p3t2:'bespoke.',p3l1:'Everything in Gold',p3l2:'Custom design from scratch',p3l3:'Multiple pages + your story',p3l4:'Custom animations & transitions',p3l5:'2 rounds of revisions',p3l6:'Personal project lead',p3l7:'Online album after the day',p3l8:'Active 24 months',p3cta:'Choose Platinum',p3note:'Longest active period',
    custEyebrow:'— White glove · no templates —',custT1:"Don't see your taste?",custT2:"Let's craft it together.",custP:"Our studio builds your invitation from a blank page — your brand, your colours, your animations, your typeface. No compromises.",
    custL1:'Custom design studio',custL2:'Animations & 3D effects',custL3:'Three languages',custL4:'Live-stream integration',
    custQuote:'"Your story is too big for a list of 99 options. Write to us."',custCta:'Request a quote',
    faqEyebrow:'— Common questions —',faqTitle1:'Everything couples',faqTitle2:'usually ask.',
    faq1q:'How quickly does the invitation go live?',faq1a:'Bronze is live within 48 hours of receiving your details. Gold in 3 — 5 business days. Platinum (bespoke design) takes 2 — 3 weeks because it includes consultation and revisions with our studio.',
    faq2q:'Can we edit content after publishing?',faq2a:'Yes. Every package includes a friendly admin panel where you can add photos, update the schedule and track RSVPs — no technical skills required.',
    faq3q:'What happens to the invitation after the wedding?',faq3a:'The invitation stays live depending on the package — from 6 to 24 months. After that you can save it as a PDF keepsake or extend it for €24 a year.',
    faq4q:'Which languages are supported?',faq4a:'Slovenian, English and Croatian by default. In Platinum we can add any language (Italian, German, Serbian, French …).',
    faq5q:'What if we need an urgent change the final week?',faq5a:"Even a month before the wedding we're here for you. Small changes (date, time, menu) you make yourselves; bigger ones (venue, design) we handle in a few hours.",
    faq6q:'How do payments work?',faq6a:'Bank transfer or card. Bronze and Gold are a single payment, Platinum we split in two (50% on order, 50% on delivery).',
    faq7q:'Can the invitation be printed for older guests?',faq7a:'Yes, in Gold and Platinum we prepare a print PDF, A5 or square — perfectly matched with the digital version.',
    faq8q:'What if we already have a photographer producing material?',faq8a:"Wonderful. Upload the photos straight into the admin and we'll take care of retouching and optimisation so it runs fast on any device.",
    ctEyebrow:'— Write to us —',ctT1:'Have a question',ctT2:'about your invitation?',ctP:'Tell us a few words about your idea — the date, the guest count, the style you have in mind. We reply personally within 24 hours.',
    ctEmail:'Email',ctPhone:'Phone',ctStudio:'Studio',ctHours:'Response time',ctHoursVal:'usually within 24 h',
    fName:'Your names',fEmail:'Email',fDate:'Wedding date',fPackage:"We're interested in",fMsg:'Message',fSend:'Send enquiry',
    fOpt0:'— Choose a package —',fOpt1:'Bronze · €60',fOpt2:'Gold · €99',fOpt3:'Platinum · €150',fOpt4:'Custom — bespoke',fOpt5:'Still deciding',
    fFine:'By submitting you agree to be contacted by us. No spam, no newsletters.',fSentT:'Thank you!',fSentP:"Your message is on its way. We'll reply within 24 hours.",
    footTag:'An elegant digital invitation for couples who want their day to be remembered — online, too.',
    footProduct:'Product',footStudio:'Studio',footLegal:'Legal',footContact:'Contact',
    footL1:'Designs',footL2:'Packages',footL3:'How it works',footL4:'FAQ',footL5:'Contact',footL6:'About us',footL7:'Couples gallery',footL8:'Blog',footL9:'Terms',footL10:'Privacy',footL11:'Cookies',footL12:'GDPR',
    footCopy:'© 2026 NajinDan · Made with care in Ljubljana',
  },
  hr: {
    navTag:'POZIVNICE · EST 2024',navBenefits:'Prednosti',navHow:'Kako radi',navTemplates:'Pozivnice',navPricing:'Paketi',navFaq:'Pitanja',navCta:'Započni',
    heroEyebrow:'Digitalne svadbene pozivnice · Slovenija & Hrvatska',heroTitle1:'Vaš dan,',heroTitle2:'u jednoj poveznici.',
    heroSub:'Elegantna, potpuno personalizirana online pozivnica — s RSVP-om, programom dana, lokacijom, glazbenim željama i galerijom. Bez papira, bez izgubljenih kuverata.',
    heroCtaPrimary:'Izradi pozivnicu',heroCtaSecondary:'Pogledaj 20 dizajna',
    heroStat1:'izrađenih pozivnica',heroStat2:'do objave pozivnice',heroStat3:'prosječna ocjena',
    figRiviera:'Riviera Edition',figBotanical:'Toscana Botanical',figNoir:'Noir Velvet',figWatercolor:'Aquarelle',
    strip1:'Sve na jednom mjestu',strip2:'RSVP uživo',strip3:'Vlastita domena',strip4:'Bez pretplate',strip5:'Slovenski · English · Hrvatski',strip6:'Online u 48 sati',
    benEyebrow:'— Zašto digitalno —',benTitle1:'Sve što papir može,',benTitle2:'i puno više.',benSub:'Jedna pozivnica za cijelu priču. Goste ažurirate u sekundi, oni odgovaraju jednim klikom — bilo gdje na svijetu.',
    b1t:'Sve na jednom mjestu',b1p:'Pozivnica, program, lokacija, registry i foto galerija — jedno polje za ažuriranje i svi gosti vide novo.',
    b2t:'RSVP uživo',b2p:'Gosti potvrđuju dolazak jednim klikom. Biraju jelo, dodaju pjesmu za podij, javljaju alergije.',
    b3t:'Tri jezika',b3p:'Slovenski, engleski i hrvatski — gosti se automatski nađu na vlastitoj jezičnoj verziji.',
    b4t:'Bez papira',b4p:'Bez printera, bez markica, bez izgubljenih kuverata. Ljepše prema okolišu i prema vašem proračunu.',
    b5t:'Vlastita domena',b5p:'lorena-i-viktor.hr ili bilo koja vaša domena. Uspomena koja ostaje i nakon velikog dana.',
    b6t:'Online u 48 sati',b6p:'Pošaljite nam podatke, mi rješavamo ostalo — pozivnica je živa za dva dana. Izmjene bez doplate.',
    howEyebrow:'— Postupak —',howTitle1:'Tri koraka',howTitle2:'do vaše pozivnice.',
    how1t:'Odaberite dizajn',how1p:'Pregledajte 20 dizajna ili zatražite nešto potpuno po mjeri. I nakon odabira boje, font i fotografije ostaju vaše za prilagodbu.',
    how2t:'Pošaljite podatke',how2p:'Zajedno popunjavamo tekstove, datum, lokaciju i sve sitne detalje. Učitajte svoje fotografije ili odaberite iz našeg arhiva.',
    how3t:'Pozivnica je živa',how3p:'Za 48 sati dobivate poveznicu koju šaljete gostima. Promjene možemo raditi mi ili vi sami kroz jednostavno admin sučelje.',
    tplEyebrow:'— Naša kolekcija —',tplTitle1:'Dvadeset dizajna,',tplTitle2:'jedan savršeni dan.',tplSub:'Pažljivo odabrani predlošci — od minimalnih do raskošnih. Svaki dizajn prilagođava se vašim bojama i tipografiji.',
    catAll:'Svi',catEditorial:'Editorial',catBotanical:'Botanika',catModern:'Moderno',catLuxe:'Luxe',
    tplFoot:'Sve pozivnice su potpuno personalizirane. Tipografija, boje, fotografije i tekstovi — sve prilagođeno vašoj priči.',tplCtaCustom:'Želite custom dizajn?',
    galEyebrow:'— Uspomene —',galTitle1:'Pravi parovi,',galTitle2:'pravi trenuci.',galSub:'Fragmenti dana koje smo pomogli pripremiti. Hvala parovima koji su podijelili svoje fotografije.',
    testEyebrow:'— Parovi kažu —',testTitle1:'Najljepši',testTitle2:'odgovori.',
    test1q:'Pozivnica je bila najljepša stvar na cijelom našem danu — prije nego je dan uopće započeo. Gosti su nas zvali da nam kažu kako je predivna.',test1meta:'Rovinj · 06.2026',test1name:'Lorena & Viktor',
    test2q:'Tri jezika, RSVP, karta, glazba — sve jedna poveznica. Gosti iz inozemstva su prvi put točno znali kada, gdje i kako.',test2meta:'Bled · 09.2025',test2name:'Sara & Tilen',
    test3q:'Dva tjedna prije svadbe morali smo promijeniti lokaciju. Jedna poruka studiju, pola sata kasnije bilo je ažurirano za 180 gostiju.',test3meta:'Piran · 07.2025',test3name:'Ana & Marko',
    testRating:'4.9 / 5 prosječna ocjena',testCount:'na temelju 187 ocjena parova',
    priceEyebrow:'— Paketi —',priceTitle1:'Ljepota,',priceTitle2:'bez kompromisa.',priceSub:'Tri paketa za većinu parova. Ako vaša priča traži više, izrađujemo nešto potpuno po mjeri.',priceOnce:'jednokratno',priceFeatured:'Najpopularniji',
    p1tier:'Brončani',p1t1:'Za',p1t2:'intimne',p1t3:'proslave.',p1l1:'Jedna pozivnica + RSVP',p1l2:'Odbrojavanje uživo',p1l3:'Galerija do 12 fotografija',p1l4:'Lokacija & karta',p1l5:'3 dizajnerske varijante',p1l6:'Personalizacija boja',p1l7:'Vlastita domena',p1cta:'Odaberi Brončani',p1note:'Aktivno 6 mjeseci',
    p2tier:'Zlatni',p2t1:'Najbolji',p2t2:'izbor',p2t3:'za većinu parova.',p2l1:'Sve iz Brončanog paketa',p2l2:'Neograničeno fotografija',p2l3:'Naša priča + program dana',p2l4:'Personalizacija boja & fontova',p2l5:'Vlastita domena (.hr / .com)',p2l6:'Izbor jela u RSVP-u',p2l7:'3 jezika automatski',p2l8:'Podrška do dana svadbe',p2cta:'Odaberi Zlatni',p2note:'Aktivno 12 mjeseci',
    p3tier:'Platinasti',p3t1:'Potpuno',p3t2:'po mjeri.',p3l1:'Sve iz Zlatnog paketa',p3l2:'Custom dizajn od nule',p3l3:'Više podstranica + priča',p3l4:'Custom animacije & prijelazi',p3l5:'2 kruga revizija',p3l6:'Osobni voditelj projekta',p3l7:'Online album nakon svadbe',p3l8:'Aktivno 24 mjeseca',p3cta:'Odaberi Platinasti',p3note:'Najduža aktivnost',
    custEyebrow:'— White glove · bez predložaka —',custT1:'Ne nalazite svoj ukus?',custT2:'Izradimo ga zajedno.',custP:'Naš studio izrađuje vašu pozivnicu od bijele stranice — vaši brendovi, vaše boje, vaše animacije, vaš font. Bez kompromisa.',
    custL1:'Custom dizajn studio',custL2:'Animacije & 3D efekti',custL3:'Tri jezika',custL4:'Live stream integracija',
    custQuote:'"Vaša priča je prejaka za polje od 99 izbora. Pišite nam."',custCta:'Zatraži ponudu',
    faqEyebrow:'— Česta pitanja —',faqTitle1:'Sve što parovi',faqTitle2:'obično pitaju.',
    faq1q:'Koliko brzo pozivnica ide uživo?',faq1a:'Brončani paket je živ u 48 sati od primitka vaših podataka. Zlatni u 3 — 5 radnih dana. Platinasti (custom dizajn) traje 2 — 3 tjedna jer uključuje konzultacije i revizije s našim studijem.',
    faq2q:'Možemo li sami uređivati sadržaj nakon objave?',faq2a:'Da. Svi paketi uključuju jednostavno admin sučelje gdje možete dodavati fotografije, ažurirati program i pratiti RSVP odgovore — bez tehničkog znanja.',
    faq3q:'Što se događa s pozivnicom nakon svadbe?',faq3a:'Pozivnica ostaje živa ovisno o paketu — od 6 do 24 mjeseca. Nakon isteka možete je spremiti kao PDF uspomenu ili produžiti za 24€ godišnje.',
    faq4q:'Koji jezici su podržani?',faq4a:'Slovenski, engleski i hrvatski po defaultu. U Platinastom paketu možemo dodati bilo koji jezik (talijanski, njemački, srpski, francuski …).',
    faq5q:'Što ako trebamo hitnu izmjenu zadnji tjedan?',faq5a:'I mjesec dana prije svadbe smo vam na raspolaganju. Manje izmjene (datum, vrijeme, jelo) napravite sami; veće (lokacija, dizajn) rješavamo mi u par sati.',
    faq6q:'Kako ide plaćanje?',faq6a:'Bankovni transfer ili kartica. Brončani i Zlatni u jednoj transakciji, Platinasti dijelimo na dva dijela (50% pri narudžbi, 50% pri predaji).',
    faq7q:'Možemo li pozivnicu otisnuti za starije goste?',faq7a:'Da, u Zlatnom i Platinastom paketu pripremamo PDF verziju za tisak, A5 ili kvadrat — savršeno usklađenu s digitalnom verzijom.',
    faq8q:'Što ako već imamo fotografa koji snima materijal?',faq8a:'Odlično. Učitajte fotografije izravno u admin i mi ćemo se pobrinuti za retuširanje i optimizaciju da brzo radi na svim uređajima.',
    ctEyebrow:'— Pišite nam —',ctT1:'Imate pitanje',ctT2:'o vašoj pozivnici?',ctP:'Pišite nam nekoliko riječi o vašoj ideji — datumu, broju gostiju, željenom stilu. Odgovaramo osobno u 24 sata.',
    ctEmail:'E-mail',ctPhone:'Telefon',ctStudio:'Studio',ctHours:'Vrijeme odgovora',ctHoursVal:'obično do 24 h',
    fName:'Vaša imena',fEmail:'E-mail',fDate:'Datum svadbe',fPackage:'Zanima nas',fMsg:'Poruka',fSend:'Pošalji upit',
    fOpt0:'— Odaberite paket —',fOpt1:'Brončani · 60€',fOpt2:'Zlatni · 99€',fOpt3:'Platinasti · 150€',fOpt4:'Custom — po mjeri',fOpt5:'Još se nismo odlučili',
    fFine:'Slanjem se slažete da vas možemo kontaktirati. Bez spama, bez newslettera.',fSentT:'Hvala!',fSentP:'Poruka je poslana. Javljamo se najkasneje u 24 sata.',
    footTag:'Elegantna digitalna pozivnica za par koji želi da njihov dan ostane upamćen — i online.',
    footProduct:'Usluga',footStudio:'Studio',footLegal:'Pravno',footContact:'Kontakt',
    footL1:'Pozivnice',footL2:'Paketi',footL3:'Kako radi',footL4:'Pitanja',footL5:'Kontakt',footL6:'O nama',footL7:'Galerija parova',footL8:'Blog',footL9:'Uvjeti',footL10:'Privatnost',footL11:'Kolačići',footL12:'GDPR',
    footCopy:'© 2026 NajinDan · Made with care in Ljubljana',
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
  const [cat, setCat] = useState<Cat>('all')
  const [formSent, setFormSent] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const advance = useCallback(() => {
    setTopIdx(prev => {
      const next = (prev + 1) % 4
      setTurningIdx(prev)
      setTimeout(() => setTurningIdx(null), 1000)
      return next
    })
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
                <span className="hero__proof-num ital">48h</span>
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
              <article className={`invite-card invite-card--riviera${turningIdx === 0 ? ' turning' : ''}`} data-pos={pos(0)}>
                <div className="ic__inner">
                  <span className="ic__corner ic__corner--tl" /><span className="ic__corner ic__corner--tr" />
                  <span className="ic__corner ic__corner--bl" /><span className="ic__corner ic__corner--br" />
                  <div className="ic__eyebrow">— SAVE THE DATE —</div>
                  <div className="ic__couple">
                    <span>Lorena</span><span className="ic__amp">&amp;</span><span>Viktor</span>
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

              <article className={`invite-card invite-card--botanical${turningIdx === 1 ? ' turning' : ''}`} data-pos={pos(1)}>
                <div className="ic__inner">
                  <svg className="bot-flora" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
                    <path d="M50 76 V30"/><path d="M50 42 C40 36 30 34 24 26 C32 32 42 38 50 40"/>
                    <path d="M50 36 C60 30 70 28 76 20 C68 28 60 32 50 34"/>
                    <path d="M50 28 C42 22 38 20 32 14 C40 20 44 22 50 26"/>
                    <ellipse cx="50" cy="18" rx="5" ry="8"/>
                  </svg>
                  <div className="bot-name ital">Lorena &amp; Viktor</div>
                  <div className="bot-sub">— vabita na svojo poroko —</div>
                  <div className="bot-date">12 · 06 · 26</div>
                </div>
              </article>

              <article className={`invite-card invite-card--noir${turningIdx === 2 ? ' turning' : ''}`} data-pos={pos(2)}>
                <div className="ic__inner">
                  <div className="noir-top">— W E D D I N G · 2026 —</div>
                  <div className="noir-couple">
                    <span>LORENA</span>
                    <em className="noir-amp">&#38;</em>
                    <span>VIKTOR</span>
                  </div>
                  <div className="noir-foot">12 · 06 · 2026 · ROVINJ</div>
                </div>
              </article>

              <article className={`invite-card invite-card--watercolor${turningIdx === 3 ? ' turning' : ''}`} data-pos={pos(3)}>
                <div className="ic__inner">
                  <div className="wc-top">— Save the date —</div>
                  <div className="wc-couple">Lorena<span className="wc-amp ital">&amp;</span>Viktor</div>
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
                    setTurningIdx(topIdx)
                    setTimeout(() => setTurningIdx(null), 1000)
                    setTopIdx(i)
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
          <figure className="gal gal--tall"><div className="gal__ph" data-label="Lorena & Viktor · Rovinj" /><figcaption>L &amp; V · 06.2026</figcaption></figure>
          <figure className="gal"><div className="gal__ph" data-label="Sara & Tilen · Bled" /><figcaption>S &amp; T · 09.2025</figcaption></figure>
          <figure className="gal"><div className="gal__ph" data-label="Ceremony" /><figcaption>Vrhnika · 05.2025</figcaption></figure>
          <figure className="gal gal--wide"><div className="gal__ph" data-label="Ana & Marko · Piran" /><figcaption>A &amp; M · 07.2025</figcaption></figure>
          <figure className="gal"><div className="gal__ph" data-label="Details" /><figcaption>The table · 08.2025</figcaption></figure>
          <figure className="gal gal--tall"><div className="gal__ph" data-label="Maja & Luka · Brda" /><figcaption>M &amp; L · 09.2024</figcaption></figure>
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
          <span className="dot">·</span>
          <span>{tr.testCount}</span>
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
              <span className="cur">€</span><span className="num">60</span>
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
              <span className="cur">€</span><span className="num">99</span>
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
              <span className="cur">€</span><span className="num">150</span>
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
    </div>
  )
}
