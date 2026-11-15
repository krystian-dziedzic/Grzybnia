export type Edibility = 'edible' | 'inedible' | 'poisonous';

export interface Mushroom {
  id: string;
  name: string;
  latinName: string;
  edibility: Edibility;
  description: string;
  season: string;
  warning?: string;
}

export const mushrooms: Mushroom[] = [
  {
    id: 'borowik-szlachetny',
    name: 'Borowik szlachetny',
    latinName: 'Boletus edulis',
    edibility: 'edible',
    description:
      'Król polskiego lasu i jeden z najcenniejszych grzybów jadalnych. Brązowy, lekko lśniący kapelusz i biały, beczułkowaty trzon z delikatnym siateczkowaniem.',
    season: 'czerwiec – październik',
    warning:
      'Nie myl z borowikiem szatańskim — ten ma czerwonawy trzon, a miąższ po przekrojeniu sinieje.',
  },
  {
    id: 'borowik-szatanski',
    name: 'Borowik szatański',
    latinName: 'Boletus satanas',
    edibility: 'poisonous',
    description:
      'Masywny grzyb o jasnym kapeluszu, czerwonych rurkach i czerwonawym trzonie. Surowy lub niedogotowany powoduje silne dolegliwości żołądkowo-jelitowe.',
    season: 'lipiec – wrzesień',
  },
  {
    id: 'kurka',
    name: 'Kurka (pieprznik jadalny)',
    latinName: 'Cantharellus cibarius',
    edibility: 'edible',
    description:
      'Żółto-pomarańczowy, lejkowaty grzyb o owocowym zapachu. Jeden z najpopularniejszych grzybów zbieranych w Polsce, rzadko bywa robaczywy.',
    season: 'czerwiec – listopad',
  },
  {
    id: 'podgrzybek-brunatny',
    name: 'Podgrzybek brunatny',
    latinName: 'Imleria badia',
    edibility: 'edible',
    description:
      'Brązowy kapelusz przypominający mały borowik, miąższ lekko niebieszczeje przy uszkodzeniu. Bardzo ceniony w kuchni.',
    season: 'lipiec – listopad',
  },
  {
    id: 'maslak-zwyczajny',
    name: 'Maślak zwyczajny',
    latinName: 'Suillus luteus',
    edibility: 'edible',
    description:
      'Śliska, lepka skórka na kapeluszu — przed jedzeniem trzeba ją zdjąć. Rośnie zwykle pod sosnami, często w dużych grupach.',
    season: 'czerwiec – listopad',
  },
  {
    id: 'muchomor-czerwony',
    name: 'Muchomor czerwony',
    latinName: 'Amanita muscaria',
    edibility: 'poisonous',
    description:
      'Najbardziej rozpoznawalny grzyb w lesie — czerwony kapelusz w białe kropki. Silnie trujący, działa halucynogennie, nigdy nie wolno go spożywać.',
    season: 'sierpień – listopad',
  },
  {
    id: 'muchomor-sromotnikowy',
    name: 'Muchomor sromotnikowy',
    latinName: 'Amanita phalloides',
    edibility: 'poisonous',
    description:
      'Najgroźniejszy grzyb trujący w Europie, odpowiedzialny za większość śmiertelnych zatruć. Zielonkawo-oliwkowy kapelusz, biały trzon z pierścieniem i charakterystyczną pochwą u podstawy.',
    season: 'lipiec – październik',
    warning:
      'Objawy zatrucia pojawiają się dopiero po kilku-kilkunastu godzinach, gdy toksyny są już wchłonięte — dlatego jest tak niebezpieczny.',
  },
  {
    id: 'gaska-zielonka',
    name: 'Gąska zielonka',
    latinName: 'Tricholoma equestre',
    edibility: 'inedible',
    description:
      'Dawniej uznawana za jadalną, dziś odradzana przez mikologów — opisano przypadki poważnego zatrucia mięśni przy częstym spożywaniu. Żółto-zielony kapelusz, żółte blaszki.',
    season: 'wrzesień – listopad',
  },
  {
    id: 'opienka-miodowa',
    name: 'Opieńka miodowa',
    latinName: 'Armillaria mellea',
    edibility: 'edible',
    description:
      'Rośnie kępami na pniach i karpach drzew. Jadalna wyłącznie po dokładnym ugotowaniu — na surowo jest lekko toksyczna i może podrażniać przewód pokarmowy.',
    season: 'wrzesień – listopad',
  },
  {
    id: 'czubajka-kania',
    name: 'Czubajka kania',
    latinName: 'Macrolepiota procera',
    edibility: 'edible',
    description:
      'Duży grzyb na wysokim, smukłym trzonie z charakterystycznym ruchomym pierścieniem. Kapelusz dobrze nadaje się do smażenia w panierce, jak kotlet.',
    season: 'lipiec – listopad',
    warning:
      'Młode, jeszcze nierozwinięte owocniki można pomylić z niektórymi trującymi czubajeczkami — zbieraj tylko dobrze rozwinięte, duże okazy.',
  },
  {
    id: 'golabek-wymiotny',
    name: 'Gołąbek wymiotny',
    latinName: 'Russula emetica',
    edibility: 'inedible',
    description:
      'Jaskrawoczerwony kapelusz i piekąco ostry smak miąższu na surowo. Powoduje dolegliwości żołądkowe, choć nie jest śmiertelnie groźny.',
    season: 'lipiec – październik',
  },
  {
    id: 'piestrzenica-kasztanowata',
    name: 'Piestrzenica kasztanowata',
    latinName: 'Gyromitra esculenta',
    edibility: 'poisonous',
    description:
      'Pomarszczony, kasztanowo-brązowy kapelusz przypominający mózg. Zawiera giromitrynę — truciznę o działaniu kumulującym się w organizmie.',
    season: 'kwiecień – maj',
    warning:
      'Bywa mylona ze smardzami. Mimo tradycji spożywania po specjalnej obróbce, zdecydowanie odradzana — ryzyko zatrucia jest realne.',
  },
  {
    id: 'smardz-jadalny',
    name: 'Smardz jadalny',
    latinName: 'Morchella esculenta',
    edibility: 'edible',
    description:
      'Wiosenny grzyb o charakterystycznym, plastrowatym kapeluszu przypominającym plaster miodu. Wymaga dokładnego ugotowania przed spożyciem.',
    season: 'kwiecień – maj',
  },
  {
    id: 'kozlarz-czerwony',
    name: 'Koźlarz czerwony',
    latinName: 'Leccinum aurantiacum',
    edibility: 'edible',
    description:
      'Pomarańczowo-ceglasty kapelusz, smukły trzon pokryty ciemnymi łuseczkami. Miąższ wyraźnie czernieje po przekrojeniu, co jest cechą charakterystyczną.',
    season: 'czerwiec – październik',
  },
];
