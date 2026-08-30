import { Article } from '@/lib/types';
import { img } from './images';

export const articles: Article[] = [
  {
    id: 'art-mahlgrad',
    slug: 'mahlgrad-richtig-einstellen',
    title: 'Mahlgrad richtig einstellen: Der ultimative Guide',
    excerpt: 'Zu fein, zu grob? So finden Sie für jede Zubereitungsart den perfekten Mahlgrad.',
    image: img.grinder,
    category: 'Zubereitung',
    readMinutes: 6,
    date: '2026-07-02',
    content: [
      'Der Mahlgrad entscheidet maßgeblich über Extraktion und Geschmack Ihres Kaffees. Zu fein gemahlen, wird der Kaffee bitter und überextrahiert; zu grob, schmeckt er dünn und sauer.',
      'Für Espresso empfehlen wir einen feinen, für French Press einen groben Mahlgrad. Filterkaffee liegt dazwischen – ähnlich wie feiner Sand.',
      'Beginnen Sie mit der Werksempfehlung Ihrer Mühle und passen Sie in kleinen Schritten an, bis die Extraktionszeit stimmt: Espresso 25–30 Sekunden, Filterkaffee 2,5–4 Minuten.',
    ],
    relatedProductIds: ['m-grind-master', 'm-handmuehle'],
  },
  {
    id: 'art-siebtraeger-wahl',
    slug: 'die-richtige-siebtraegermaschine-waehlen',
    title: 'Die richtige Siebträgermaschine wählen',
    excerpt: 'Einkreis oder Doppelkessel? Was Sie vor dem Kauf einer Siebträgermaschine wissen sollten.',
    image: img.espressoMachineLight,
    category: 'Kaufberatung',
    readMinutes: 8,
    date: '2026-06-18',
    content: [
      'Siebträgermaschinen unterscheiden sich vor allem im Kesselsystem: Einkreis-Maschinen sind günstiger, benötigen aber Wartezeit zwischen Brühen und Dampf.',
      'Doppelkessel-Maschinen wie unsere PICCOLA Pro erlauben gleichzeitiges Brühen und Aufschäumen – ideal für Milchkaffee-Liebhaber.',
      'Achten Sie zudem auf die Siebträgergröße (58 mm ist Profistandard) und die Verfügbarkeit von Ersatzteilen.',
    ],
    relatedProductIds: ['m-piccola-pro', 'm-onda-siebtraeger'],
  },
  {
    id: 'art-bohnen-lagern',
    slug: 'kaffeebohnen-richtig-lagern',
    title: 'Kaffeebohnen richtig lagern',
    excerpt: 'Licht, Luft, Wärme und Feuchtigkeit sind die größten Feinde frischer Röstung. So bleibt Ihr Kaffee länger aromatisch.',
    image: img.beansBag,
    category: 'Wissen',
    readMinutes: 4,
    date: '2026-05-30',
    content: [
      'Bewahren Sie Kaffeebohnen luftdicht, dunkel und kühl auf – am besten in einem Aromaventil-Beutel oder einer Keramikdose.',
      'Verzichten Sie auf den Kühlschrank: Kondenswasser schadet dem Aroma. Kaufen Sie lieber kleinere Mengen und rösten Sie sich frisch nach.',
      'Optimal genießen lässt sich Kaffee zwischen 5 und 20 Tagen nach dem Röstdatum.',
    ],
    relatedProductIds: ['c-espresso-imperio', 'c-blend-casa-forte'],
  },
  {
    id: 'art-roestgrade',
    slug: 'unterschiede-zwischen-roestungen',
    title: 'Unterschiede zwischen Röstungen erklärt',
    excerpt: 'Hell, mittel, dunkel: Wie der Röstgrad Aroma, Säure und Körper Ihres Kaffees beeinflusst.',
    image: img.beansMacro,
    category: 'Wissen',
    readMinutes: 5,
    date: '2026-05-12',
    content: [
      'Helle Röstungen betonen die ursprünglichen Fruchtnoten des Rohkaffees und bringen mehr Säure mit – ideal für Filterkaffee.',
      'Mittlere Röstungen balancieren Süße, Säure und Körper und eignen sich vielseitig für Espresso und Filter.',
      'Dunkle Röstungen entwickeln kräftige Röstaromen wie Schokolade und Rauch, verlieren dabei aber an Herkunftscharakter.',
    ],
    relatedProductIds: ['c-single-yirgacheffe', 'c-blend-notte'],
  },
  {
    id: 'art-rezepte',
    slug: 'drei-kaffeerezepte-fuer-zuhause',
    title: 'Drei Kaffeerezepte für zu Hause',
    excerpt: 'Von klassischem Flat White bis Iced Latte – drei einfache Rezepte für Ihren Vollautomaten oder Siebträger.',
    image: img.latteArt,
    category: 'Rezepte',
    readMinutes: 5,
    date: '2026-04-28',
    content: [
      'Flat White: Ein doppelter Espresso mit 120 ml mikroaufgeschäumter Milch, samtig eingegossen.',
      'Iced Latte: Espresso über Eiswürfel gießen, mit kalter Milch auffüllen – erfrischend für den Sommer.',
      'Spanish Latte: Espresso mit gezuckerter Kondensmilch und aufgeschäumter Milch – süß und intensiv.',
    ],
    relatedProductIds: ['a-milchkaenchen', 'm-corvo-auto'],
  },
  {
    id: 'art-pflege',
    slug: 'maschinenpflege-so-haelt-ihre-maschine-laenger',
    title: 'Maschinenpflege: So hält Ihre Maschine länger',
    excerpt: 'Regelmäßige Reinigung und Entkalkung verlängern die Lebensdauer Ihrer Espressomaschine erheblich.',
    image: img.espressoMachineDark2,
    category: 'Pflege',
    readMinutes: 6,
    date: '2026-04-09',
    content: [
      'Reinigen Sie die Brühgruppe wöchentlich mit klarem Wasser und monatlich mit Reinigungstabletten.',
      'Entkalken Sie je nach Wasserhärte alle 2–3 Monate, um Kalkablagerungen in Leitungen zu vermeiden.',
      'Ein Wasserfilter reduziert den Wartungsaufwand spürbar und schützt die Pumpe.',
    ],
    relatedProductIds: ['a-reinigung-tabs', 'a-wasserfilter'],
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}
