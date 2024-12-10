import { doc, setDoc } from "firebase/firestore";
import { UserDto } from "../../apis/users";
import { db } from "../../config/firebase";

export const initUsers = async () => {
  for (const user of users) {
    console.log(user);
    const userRef = doc(db, "users", user.userId);
    await setDoc(userRef, user);
  }
};

const users: UserDto[] = [
  {
    email: "fay_86@gmail.com",
    userId: "fay_86@gmail.com",
    displayName: "Fay",
  },
  {
    email: "nina_t@gmail.com",
    userId: "nina_t@gmail.com",
    displayName: "Nina",
  },
  {
    email: "gia_p@gmail.com",
    userId: "gia_p@gmail.com",
    displayName: "Gia",
  },
  {
    email: "jay_k@gmail.com",
    userId: "jay_k@gmail.com",
    displayName: "Jay",
  },
  {
    email: "brad_k@gmail.com",
    userId: "brad_k@gmail.com",
    displayName: "Brad",
  },
  {
    email: "dan_m@gmail.com",
    userId: "dan_m@gmail.com",
    displayName: "Dan",
  },
  {
    email: "deb_h@gmail.com",
    userId: "deb_h@gmail.com",
    displayName: "Deb",
  },
  {
    email: "tara_p@gmail.com",
    userId: "tara_p@gmail.com",
    displayName: "Tara",
  },
  {
    email: "joel_t@gmail.com",
    userId: "joel_t@gmail.com",
    displayName: "Joel",
  },
  {
    email: "ella_m@gmail.com",
    userId: "ella_m@gmail.com",
    displayName: "Ella",
  },
  {
    email: "rick_j@gmail.com",
    userId: "rick_j@gmail.com",
    displayName: "Rick",
  },
  {
    email: "tony_m@gmail.com",
    userId: "tony_m@gmail.com",
    displayName: "Tony",
  },
  {
    email: "alma_k@gmail.com",
    userId: "alma_k@gmail.com",
    displayName: "Alma",
  },
  {
    email: "joy_89@gmail.com",
    userId: "joy_89@gmail.com",
    displayName: "Joy",
  },
  {
    email: "eve_k@gmail.com",
    userId: "eve_k@gmail.com",
    displayName: "Eve",
  },
  {
    email: "zara_h@gmail.com",
    userId: "zara_h@gmail.com",
    displayName: "Zara",
  },
  {
    email: "josh_d@gmail.com",
    userId: "josh_d@gmail.com",
    displayName: "Josh",
  },
  {
    email: "pete_s@gmail.com",
    userId: "pete_s@gmail.com",
    displayName: "Pete",
  },
  {
    email: "sara_t@gmail.com",
    userId: "sara_t@gmail.com",
    displayName: "Sara",
  },
  {
    email: "dora_l@gmail.com",
    userId: "dora_l@gmail.com",
    displayName: "Dora",
  },
  {
    email: "ivy_p@gmail.com",
    userId: "ivy_p@gmail.com",
    displayName: "Ivy",
  },
  {
    email: "luke_j@gmail.com",
    userId: "luke_j@gmail.com",
    displayName: "Luke",
  },
  {
    email: "tom_b@gmail.com",
    userId: "tom_b@gmail.com",
    displayName: "Tom",
  },
  {
    email: "phil_s@gmail.com",
    userId: "phil_s@gmail.com",
    displayName: "Phil",
  },
  {
    email: "drew_t@gmail.com",
    userId: "drew_t@gmail.com",
    displayName: "Drew",
  },
  {
    email: "lea_p@gmail.com",
    userId: "lea_p@gmail.com",
    displayName: "Lea",
  },
  {
    email: "alex42@gmail.com",
    userId: "alex42@gmail.com",
    displayName: "Alex42@gmail.com",
  },
  {
    email: "mona_t@gmail.com",
    userId: "mona_t@gmail.com",
    displayName: "Mona",
  },
  {
    email: "zoe_m@gmail.com",
    userId: "zoe_m@gmail.com",
    displayName: "Zoe",
  },
  {
    email: "wade_k@gmail.com",
    userId: "wade_k@gmail.com",
    displayName: "Wade",
  },
  {
    email: "theo_m@gmail.com",
    userId: "theo_m@gmail.com",
    displayName: "Theo",
  },
  {
    email: "lisa_h@gmail.com",
    userId: "lisa_h@gmail.com",
    displayName: "Lisa",
  },
  {
    email: "paul_j@gmail.com",
    userId: "paul_j@gmail.com",
    displayName: "Paul",
  },
  {
    email: "beth_m@gmail.com",
    userId: "beth_m@gmail.com",
    displayName: "Beth",
  },
  {
    email: "ava_85@gmail.com",
    userId: "ava_85@gmail.com",
    displayName: "Ava",
  },
  {
    email: "max_99@gmail.com",
    userId: "max_99@gmail.com",
    displayName: "Max",
  },
  {
    email: "kurt_j@gmail.com",
    userId: "kurt_j@gmail.com",
    displayName: "Kurt",
  },
  {
    email: "leo85@gmail.com",
    userId: "leo85@gmail.com",
    displayName: "Leo85@gmail.com",
  },
  {
    email: "uma_k@gmail.com",
    userId: "uma_k@gmail.com",
    displayName: "Uma",
  },
  {
    email: "ida_p@gmail.com",
    userId: "ida_p@gmail.com",
    displayName: "Ida",
  },
  {
    email: "eva_83@gmail.com",
    userId: "eva_83@gmail.com",
    displayName: "Eva",
  },
  {
    email: "ross_m@gmail.com",
    userId: "ross_m@gmail.com",
    displayName: "Ross",
  },
  {
    email: "andy_k@gmail.com",
    userId: "andy_k@gmail.com",
    displayName: "Andy",
  },
  {
    email: "greg_h@gmail.com",
    userId: "greg_h@gmail.com",
    displayName: "Greg",
  },
  {
    email: "rosa_m@gmail.com",
    userId: "rosa_m@gmail.com",
    displayName: "Rosa",
  },
  {
    email: "iris_k@gmail.com",
    userId: "iris_k@gmail.com",
    displayName: "Iris",
  },
  {
    email: "rex_h@gmail.com",
    userId: "rex_h@gmail.com",
    displayName: "Rex",
  },
  {
    email: "mae_87@gmail.com",
    userId: "mae_87@gmail.com",
    displayName: "Mae",
  },
  {
    email: "maya_h@gmail.com",
    userId: "maya_h@gmail.com",
    displayName: "Maya",
  },
  {
    email: "chad_m@gmail.com",
    userId: "chad_m@gmail.com",
    displayName: "Chad",
  },
  {
    email: "dev123@gmail.com",
    userId: "dev123@gmail.com",
    displayName: "Dev123@gmail.com",
  },
  {
    email: "dean_k@gmail.com",
    userId: "dean_k@gmail.com",
    displayName: "Dean",
  },
  {
    email: "vera_j@gmail.com",
    userId: "vera_j@gmail.com",
    displayName: "Vera",
  },
  {
    email: "mia_90@gmail.com",
    userId: "mia_90@gmail.com",
    displayName: "Mia",
  },
  {
    email: "rita_s@gmail.com",
    userId: "rita_s@gmail.com",
    displayName: "Rita",
  },
  {
    email: "neil_s@gmail.com",
    userId: "neil_s@gmail.com",
    displayName: "Neil",
  },
  {
    email: "ray_82@gmail.com",
    userId: "ray_82@gmail.com",
    displayName: "Ray",
  },
  {
    email: "mark_v@gmail.com",
    userId: "mark_v@gmail.com",
    displayName: "Mark",
  },
  {
    email: "adam_p@gmail.com",
    userId: "adam_p@gmail.com",
    displayName: "Adam",
  },
  {
    email: "lucy_r@gmail.com",
    userId: "lucy_r@gmail.com",
    displayName: "Lucy",
  },
  {
    email: "jane_w@gmail.com",
    userId: "jane_w@gmail.com",
    displayName: "Jane",
  },
  {
    email: "tina_s@gmail.com",
    userId: "tina_s@gmail.com",
    displayName: "Tina",
  },
  {
    email: "sean_t@gmail.com",
    userId: "sean_t@gmail.com",
    displayName: "Sean",
  },
  {
    email: "raja_v@gmail.com",
    userId: "raja_v@gmail.com",
    displayName: "Raja",
  },
  {
    email: "ruby_k@gmail.com",
    userId: "ruby_k@gmail.com",
    displayName: "Ruby",
  },
  {
    email: "owen_p@gmail.com",
    userId: "owen_p@gmail.com",
    displayName: "Owen",
  },
  {
    email: "amy_p@gmail.com",
    userId: "amy_p@gmail.com",
    displayName: "Amy",
  },
  {
    email: "sam_j@gmail.com",
    userId: "sam_j@gmail.com",
    displayName: "Sam",
  },
  {
    email: "matt_s@gmail.com",
    userId: "matt_s@gmail.com",
    displayName: "Matt",
  },
  {
    email: "carl_t@gmail.com",
    userId: "carl_t@gmail.com",
    displayName: "Carl",
  },
  {
    email: "lena_p@gmail.com",
    userId: "lena_p@gmail.com",
    displayName: "Lena",
  },
  {
    email: "lily_w@gmail.com",
    userId: "lily_w@gmail.com",
    displayName: "Lily",
  },
  {
    email: "dave_p@gmail.com",
    userId: "dave_p@gmail.com",
    displayName: "Dave",
  },
  {
    email: "ana_k@gmail.com",
    userId: "ana_k@gmail.com",
    displayName: "Ana",
  },
  {
    email: "rob_h@gmail.com",
    userId: "rob_h@gmail.com",
    displayName: "Rob",
  },
  {
    email: "kent_m@gmail.com",
    userId: "kent_m@gmail.com",
    displayName: "Kent",
  },
  {
    email: "kim23@gmail.com",
    userId: "kim23@gmail.com",
    displayName: "Kim",
  },
  {
    email: "ryan_m@gmail.com",
    userId: "ryan_m@gmail.com",
    displayName: "Ryan",
  },
  {
    email: "sue_p@gmail.com",
    userId: "sue_p@gmail.com",
    displayName: "Sue",
  },
  {
    email: "ian_84@gmail.com",
    userId: "ian_84@gmail.com",
    displayName: "Ian",
  },
  {
    email: "nora_b@gmail.com",
    userId: "nora_b@gmail.com",
    displayName: "Nora",
  },
  {
    email: "cole_j@gmail.com",
    userId: "cole_j@gmail.com",
    displayName: "Cole",
  },
  {
    email: "jack88@gmail.com",
    userId: "jack88@gmail.com",
    displayName: "Jack88@gmail.com",
  },
  {
    email: "mike_d@gmail.com",
    userId: "mike_d@gmail.com",
    displayName: "Mike",
  },
  {
    email: "eric_t@gmail.com",
    userId: "eric_t@gmail.com",
    displayName: "Eric",
  },
  {
    email: "emma_l@gmail.com",
    userId: "emma_l@gmail.com",
    displayName: "Emma",
  },
  {
    email: "nina_p@gmail.com",
    userId: "nina_p@gmail.com",
    displayName: "Nina",
  },
  {
    email: "ben_h@gmail.com",
    userId: "ben_h@gmail.com",
    displayName: "Ben",
  },
  {
    email: "nick_j@gmail.com",
    userId: "nick_j@gmail.com",
    displayName: "Nick",
  },
  {
    email: "hyewon0809@sasa.hs.kr",
    userId: "DzBmpq9eg4gDIpo3CV0S96KPTOS2",
    displayName: "Rosaline",
  },
  {
    userId: "EJopMvwb98Q51nuj9k4bhwITFrt2",
    profilePicture:
      "https://lh3.googleusercontent.com/a/ACg8ocLwYC6cSYIQD0m6CDD4CAR55Qo8L_retEIGg3WpDNE9EoiznQ=s96-c",
    email: "hyewonlee@reconnect.red",
    displayName: "Merrion",
  },
  {
    profilePicture:
      "https://lh3.googleusercontent.com/a/ACg8ocLPZ5XREoiAZ3ZjM8PDSx-hAABeJKu0Oja3FTkENAFT4y_r6A=s96-c",
    email: "kimhyunanothyuna@gmail.com",
    userId: "IRVD2f2xkrVNoVnFKGjG7uvLwtW2",
    displayName: "Rory",
  },
  {
    profilePicture:
      "https://lh3.googleusercontent.com/a/ACg8ocLFe2ZoEwYWSu7BDLQ_FZzXM1RYz2k20kgA5p9RKyL0Qifg9ckKEg=s96-c",
    email: "sheikhshafayat2@gmail.com",
    userId: "PgRRruOoU2VsTNvhF6j05iTTOfe2",
    displayName: "Mandi",
  },
  {
    profilePicture:
      "https://lh3.googleusercontent.com/a/ACg8ocK5E2cEHjUJ2Su7fuBSZtosk8On2jgI--_we4pyno24O2_9MQ=s96-c",
    email: "zahrabayramly@gmail.com",
    userId: "TdsTJxteN2T2lQUSbGGpj14TTfg2",
    displayName: "Zahra",
  },
  {
    userId: "Vx7qldr9JUSrZ22I3lIb83mm8vu1",
    profilePicture:
      "https://lh3.googleusercontent.com/a/ACg8ocJ_jxuWCcPnapriFOoELe2gHlcDn5GeMBWEU1qGnyZt4tGNmo1r=s96-c",
    email: "21hyuna.kim@sis-kg.org",
    displayName: "Ava",
  },
  {
    profilePicture:
      "https://lh3.googleusercontent.com/a/ACg8ocIBDzM3e8T-1TeKvq-5BImA6z5pgfQsOGKDnc7eLmeWOcdWGg=s96-c",
    email: "kimhyuna0321@gmail.com",
    userId: "aagNYe4N79XCMVaA3Vb3nmloeZh1",
    displayName: "Hyun A",
  },
  {
    userId: "YFgcb54LcTeBOaNnJNaOXOFvSiW2",
    profilePicture:
      "https://lh3.googleusercontent.com/a/ACg8ocKZjMYZjp-ZDq66FE1fsNOygwHPKwuLBhViUBtgDwRdnBx3m1iC=s96-c",
    email: "kaist.helloworld@gmail.com",
    displayName: "Charlotte",
  },
  {
    displayName: "BakingNewbie",
    userId: "bakingnewbie",
    email: "bakingnewbie@example.com",
  },
  {
    userId: "bakingpro",
    displayName: "BakingPro",
    email: "bakingpro@example.com",
  },
  {
    displayName: "BakingScience",
    email: "bakingscience@example.com",
    userId: "bakingscience",
  },
  {
    email: "beginnerbaker@example.com",
    displayName: "BeginnerBaker",
    userId: "beginnerbaker",
  },
  {
    userId: "butterlover",
    displayName: "ButterLover",
    email: "butterlover@example.com",
  },
  {
    userId: "chocolateking",
    displayName: "ChocolateKing",
    email: "chocolateking@example.com",
  },
  {
    displayName: "CookieExpert",
    email: "cookieexpert@example.com",
    userId: "cookieexpert",
  },
  {
    userId: "cookiepro",
    displayName: "CookiePro",
    email: "cookiepro@example.com",
  },
  {
    displayName: "CookieTimer",
    email: "cookietimer@example.com",
    userId: "cookietimer",
  },
  {
    userId: "doughshaper",
    displayName: "DoughShaper",
    email: "doughshaper@example.com",
  },
  {
    email: "enthusiast@example.com",
    displayName: "Enthusiast",
    userId: "enthusiast",
  },
  {
    userId: "flourpro",
    displayName: "FlourPro",
    email: "flourpro@example.com",
  },
  {
    userId: "goldenbrown",
    displayName: "GoldenBrown",
    email: "goldenbrown@example.com",
  },
  {
    email: "hyewonlee010809@gmail.com",
    userId: "hTuijboDS2dlRRt48VGQvddAYC73",
    displayName: "Sophia",
  },
  {
    userId: "host",
    email: "host@example.com",
    displayName: "Host",
  },
  {
    userId: "jm8nVXBzC1OVCZaQgsnF4WrMfSX2",
    profilePicture:
      "https://lh3.googleusercontent.com/a/ACg8ocIVpq8ZgmnYN6nCodTizZsskCizX1SbT6hmGQ6AEQieY2M7Nw=s96-c",
    email: "kimh2364@gmail.com",
    displayName: "Hannah",
  },
  {
    displayName: "MeasurePro",
    email: "measurepro@example.com",
    userId: "measurepro",
  },
  {
    email: "mixmaster@example.com",
    displayName: "MixMaster",
    userId: "mixmaster",
  },
  {
    displayName: "Newbie",
    email: "newbie@example.com",
    userId: "newbie",
  },
  {
    email: "ovenmaster@example.com",
    userId: "ovenmaster",
    displayName: "OvenMaster",
  },
  {
    userId: "pBByA7u5jJZcZeJLFibPefs334B3",
    email: "chackhangun@gmail.com",
    profilePicture:
      "https://lh3.googleusercontent.com/a/ACg8ocKWMTMCMBXq6XpDLEY8uiMbE7NzaSp0-piPbSeD9IGHusTfXQ=s96-c",
    displayName: "Chack",
  },
  {
    email: "panpro@example.com",
    displayName: "PanPro",
    userId: "panpro",
  },
  {
    displayName: "PatientBaker",
    userId: "patientbaker",
    email: "patientbaker@example.com",
  },
  {
    displayName: "ProBaker",
    userId: "probaker",
    email: "probaker@example.com",
  },
  {
    email: "bestjeanne@gmail.com",
    profilePicture:
      "https://lh3.googleusercontent.com/a/ACg8ocK3iYXyy2D9j7T33OPYIZZfTc0aJsuGxEJFpotZCJVnKcr2MIV2=s96-c",
    userId: "qFWOCjBuyYOCZl5Qq8nLPU1UF002",
    displayName: "Jeanne",
  },
  {
    displayName: "QualityChef",
    email: "qualitychef@example.com",
    userId: "qualitychef",
  },
  {
    userId: "scaleexpert",
    email: "scaleexpert@example.com",
    displayName: "ScaleExpert",
  },
  {
    email: "siftmaster@example.com",
    displayName: "SiftMaster",
    userId: "siftmaster",
  },
  {
    email: "speedbaker@example.com",
    displayName: "SpeedBaker",
    userId: "speedbaker",
  },
  {
    email: "tempmaster@example.com",
    displayName: "TempMaster",
    userId: "tempmaster",
  },
  {
    email: "test@example.com",
    userId: "testUser123",
    displayName: "Test User",
  },
  {
    userId: "testUser456",
    displayName: "Baker Lvl 100",
    email: "test@example.com",
  },
  {
    displayName: "TimeManager",
    email: "timemanager@example.com",
    userId: "timemanager",
  },
  {
    email: "timingsage@example.com",
    displayName: "TimingSage",
    userId: "timingsage",
  },
  {
    userId: "toolmaster",
    email: "toolmaster@example.com",
    displayName: "ToolMaster",
  },
  {
    userId: "ugXMlUcKTRaxsj4EMskGdbx50pU2",
    email: "chillo@sparcs.org",
    profilePicture:
      "https://lh3.googleusercontent.com/a/ACg8ocI0VgKKlTGrT7eV_4iyNR4BVFKDRgse5r7aaPcx5eEb9LyYRw=s96-c",
    displayName: "Noah",
  },
  {
    profilePicture: "https://example.com/profile.jpg",
    email: "test@example.com",
    userId: "user123",
    displayName: "Olivia",
  },
  {
    userId: "vanillaqueen",
    displayName: "VanillaQueen",
    email: "vanillaqueen@example.com",
  },
];
