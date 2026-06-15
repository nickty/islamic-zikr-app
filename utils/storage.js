import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@zikr_data";
const STATS_KEY = "@zikr_stats";

// Default Zikr Data (You can edit this directly)
export const defaultZikrData = {
  morning: {
    title: "Morning Zikr",
    icon: "🌅",
    duas: [
      {
        id: "1",
        arabic:
          "ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُۥ مَا فِى ٱلسَّمَـٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۚ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۚ وَلَا يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ ۚ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ",
        transliteration:
          "Allahu la ilaaha illa Huwal-Hayyul-Qayyeem. Laa ta'khudhuhu sinatun wa laa nawm. Lahu maa fis-samaawaati wa maa fil-ard. Man dhal-ladhee yashfa'u 'indahoo illa bi-idhnih. Ya'lamu maa bayna aydeehim wa maa khalfahum. Wa laa yuheetoona bishay-im-min 'ilmihee illa bimaa shaa'. Wasi'a kursiyyuhus-samaawaati wal-ard. Wa laa ya'ooduhu hifdhuhumaa wa Huwal-'Aliyyul-'Adheem.",
        translation:
          "Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is [presently] before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
        repetitions: 1,
      },
      {
        id: "2", // Increment as needed
        arabic:
          "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\nقُلْ هُوَ ٱللَّهُ أَحَدٌ\nٱللَّهُ ٱلصَّمَدُ\nلَمْ يَلِدْ وَلَمْ يُولَدْ\nوَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌ",
        transliteration:
          "Bismillaahir Rahmaanir Raheem. Qul huwal laahu ahad. Allaahus samad. Lam yalid wa lam yoolad. Wa lam yakul lahoo kufuwan ahad.",
        translation:
          'In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, "He is Allah, [who is] One. Allah, the Absolute Reference. He neither begets nor is born. Nor is there to Him any equivalent."',
        repetitions: 3,
      },
      {
        id: "3",
        arabic:
          "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\nقُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ\nمِن شَرِّ مَا خَلَقَ\nوَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ\nوَمِن شَرِّ ٱلنَّفَّـٰثَـٰتِ فِى ٱلْعُقَدِ\nوَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        transliteration:
          "Bismillaahir Rahmaanir Raheem. Qul a'oodhu bi rabbil-falaq. Min sharri maa khalaq. Wa min sharri ghaasiqin idhaa waqab. Wa min sharrin-naffaathaati fil-'uqad. Wa min sharri haasidin idhaa hasad.",
        translation:
          'In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, "I seek refuge in the Lord of daybreak. From the evil of that which He created. And from the evil of darkness when it settles. And from the evil of the blowers in knots. And from the evil of an envier when he envies."',
        repetitions: 3,
      },
      {
        id: "4",
        arabic:
          "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\nقُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ\nمَلِكِ ٱلنَّاسِ\nإِلَـٰهِ ٱلنَّاسِ\nمِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ\nٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ\nمِنَ ٱلْجِنَّةِ وَٱلنَّاسِ",
        transliteration:
          "Bismillaahir Rahmaanir Raheem. Qul a'oodhu bi rabbin-naas. Malikin-naas. Ilaahin-naas. Min sharril-waswaasil-khannaas. Alladhee yuwaswisu fee sudoorin-naas. Minal-jinnati wan-naas.",
        translation:
          'In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, "I seek refuge in the Lord of mankind. The Sovereign of mankind. The God of mankind. From the evil of the retreating whisperer. Who whispers [evil] into the breasts of mankind. From among the jinn and mankind."',
        repetitions: 3,
      },
      {
        id: "5",
        arabic:
          "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لله، وَالْحَمْدُ لله لَا إِلَهَ إِلَّا اللهُ، وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِا اليومِ وَخَيْرَ مَا بَعْدَه، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِا اليومِ وَشَرِّ مَا بَعْدَه، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرُِ",
        transliteration:
          "Asbahna wa asbahal-mulku lillah, walhamdulillah la ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir. Rabbi as'aluka khayra ma fee hadhal-yawmi wa khayra ma ba'dah, wa a'udhu bika min sharri ma fee hadhal-yawmi wa sharri ma ba'dah. Rabbi a'udhu bika minal-kasali wa soo'il-kibar, Rabbi a'udhu bika min 'adhabin fin-nari wa 'adhabin fil-qabr.",
        translation:
          "We have entered the morning and at this very time the whole kingdom belongs to Allah. Praise is due to Allah. There is no deity except Allah, the Only One without any partner. His is the kingdom and to Him is praise due, and He is Powerful over everything. My Lord, I ask You for the good of this day and the good of what follows it, and I seek refuge in You from the evil of this day and the evil of what follows it. My Lord, I seek refuge in You from laziness and the hardships of old age. My Lord, I seek refuge in You from the torment of the Fire and the torment of the grave.",
        repetitions: 1,
      },
      {
        id: "6",
        arabic:
          "اللَّهُمَّ أَنْتَ رَبِّي، لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
        transliteration:
          "Allahumma Anta Rabbee la ilaha illa Ant, khalaqtanee wa ana 'abduk, wa ana 'ala 'ahdika wa wa'dika mas-tata't, a'oodhu bika min sharri ma sana't, aboo'u laka bini'matika 'alayya wa aboo'u laka bidhanbee faghfir lee fa innahu la yaghfirudh-dhunooba illa Ant.",
        translation:
          "O Allah, You are my Lord, there is no deity except You. You created me and I am Your servant, and I am faithful to my covenant and my promise to You as much as I am able. I seek refuge in You from the evil of what I have done. I acknowledge before You Your blessings upon me, and I acknowledge my sin, so forgive me, for indeed, no one forgives sins except You.",
        repetitions: 1,
      },
      {
        id: "7",
        arabic:
          "اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ، وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ",
        transliteration:
          "Allahumma innee asbahtu ushhiduka, wa ushhidu hamalata 'arshika, wa mala'ikataka, wa jamee'a khalqika, annaka Antallahu la ilaha illa Anta wahdaka la shareeka lak, wa anna Muhammadan 'abduka wa rasooluk.",
        translation:
          "O Allah, I have entered the morning and I call upon You, the bearers of Your Throne, Your angels, and all of Your creation to witness that You are Allah, there is no deity except You, Alone without partner, and that Muhammad is Your servant and Your Messenger.",
        repetitions: 4,
      },
      {
        id: "8",
        arabic:
          "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ، وَالْفَقْرِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ",
        transliteration:
          "Allahumma 'aafinee fee badanee, Allahumma 'aafinee fee sam'ee, Allahumma 'aafinee fee basaree, la ilaha illa Ant. Allahumma innee a'oodhu bika minal-kufri wal-faqr, Allahumma innee a'oodhu bika min 'adhabil-qabr, la ilaha illa Ant.",
        translation:
          "O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight. There is no deity except You. O Allah, I seek refuge in You from disbelief and poverty, and I seek refuge in You from the punishment of the grave. There is no deity except You.",
        repetitions: 3,
      },
      {
        id: "9",
        arabic:
          "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ ۖ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
        transliteration:
          "Hasbiyallahu la ilaha illa Huwa, 'alayhi tawakkaltu, wa Huwa Rabbul-'Arshil-'Adheem.",
        translation:
          "Sufficient for me is Allah; there is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne.",
        repetitions: 7,
      },
      {
        id: "10",
        arabic:
          "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي، وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي",
        transliteration:
          "Allahumma innee as'alukal-'afwa wal-'aafiyata fid-dunya wal-aakhirah. Allahumma innee as'alukal-'afwa wal-'aafiyata fee deenee wa dunyaya wa ahlee wa maalee. Allahummastur 'awraatee wa aamin raw'aatee. Allahummahfadhnee min bayni yadayya, wa min khalfee, wa 'an yameenee, wa 'an shimaalee, wa min fawqee, wa a'oodhu bi'adhamatika an ughtaala min tahtee.",
        translation:
          "O Allah, I ask You for forgiveness and well-being in this world and the Next. O Allah, I ask You for forgiveness and well-being in my religion, my worldly affairs, my family and my wealth. O Allah, conceal my faults and calm my fears. O Allah, guard me from before me and from behind me, from my right and from my left, and from above me, and I seek refuge in Your Greatness from being swallowed up from beneath me.",
        repetitions: 1,
      },
      {
        id: "11",
        arabic:
          "اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ، فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءًا أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ",
        transliteration:
          "Allahumma 'Aalimal-ghaybi wash-shahadah, Faatiras-samaawaati wal-ard, Rabba kulli shay'in wa maleekah, ashhadu an la ilaha illa Ant. A'oodhu bika min sharri nafsee wa min sharrish-shaytaani wa shirkih, wa an aqtarifa 'ala nafsee soo'an aw ajurrahoo ila muslim.",
        translation:
          "O Allah, Knower of the unseen and the seen, Creator of the heavens and the earth, Lord and Sovereign of all things, I bear witness that there is no deity except You. I seek refuge in You from the evil of myself and from the evil of Shaytan and his call to shirk, and from committing any evil against myself or bringing it upon another Muslim.",
        repetitions: 1,
      },
      {
        id: "12",
        arabic:
          "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
        transliteration:
          "Bismillahilladhee la yadurru ma'as-mihi shay'un fil-ardi wa la fis-samaa'i wa Huwas-Samee'ul-'Aleem.",
        translation:
          "In the name of Allah, with Whose name nothing can cause harm on earth or in the heaven, and He is the All-Hearing, the All-Knowing.",
        repetitions: 3,
      },
      {
        id: "13",
        arabic:
          "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ، اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ فَتْحَهُ، وَنَصْرَهُ، وَنُورَهُ، وَبَرَكَتَهُ، وَهُدَاهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِيهِ وَشَرِّ مَا بَعْدَهُ",
        transliteration:
          "Asbahna wa asbahal-mulku lillahi Rabbil-'aalameen. Allahumma innee as'aluka khayra hadhal-yawmi: fathahu, wa nasrahu, wa noorahu, wa barakatahu, wa hudahu, wa a'udhu bika min sharri ma feehi wa sharri ma ba'dahu.",
        translation:
          "We have entered the morning and at this very time the whole kingdom belongs to Allah, Lord of the worlds. O Allah, I ask You for the goodness of this day: its victory, its assistance, its light, its blessings, and its guidance. And I seek refuge in You from the evil of what is in it and the evil of what follows it.",
        repetitions: 1,
      },
      {
        id: "14",
        arabic:
          "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ",
        transliteration:
          "Allahumma innee a'oodhu bika minal-hammi wal-hazani, wal-'ajzi wal-kasali, wal-bukhli wal-jubni, wa dala'id-dayni, wa ghalabatir-rijaal.",
        translation:
          "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men.",
        repetitions: 1,
      },
      {
        id: "15",
        arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
        transliteration:
          "Allahumma salli 'ala Muhammadin wa 'ala aali Muhammad.",
        translation:
          "O Allah, send prayers upon Muhammad and upon the family of Muhammad.",
        repetitions: 10,
      },
    ],
  },
  afternoon: {
    title: "Afternoon Zikr",
    icon: "☀️",
    duas: [
      {
        id: "16",
        arabic:
          "ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُۥ مَا فِى ٱلسَّمَـٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۚ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۚ وَلَا يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ ۚ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ",
        transliteration:
          "Allahu la ilaaha illa Huwal-Hayyul-Qayyeem. Laa ta'khudhuhu sinatun wa laa nawm. Lahu maa fis-samaawaati wa maa fil-ard. Man dhal-ladhee yashfa'u 'indahoo illa bi-idhnih. Ya'lamu maa bayna aydeehim wa maa khalfahum. Wa laa yuheetoona bishay-im-min 'ilmihee illa bimaa shaa'. Wasi'a kursiyyuhus-samaawaati wal-ard. Wa laa ya'ooduhu hifdhuhumaa wa Huwal-'Aliyyul-'Adheem.",
        translation:
          "Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is [presently] before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
        repetitions: 1,
      },
      {
        id: "17",
        arabic:
          "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\nقُلْ هُوَ ٱللَّهُ أَحَدٌ\nٱللَّهُ ٱلصَّمَدُ\nلَمْ يَلِدْ وَلَمْ يُولَدْ\nوَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌ",
        transliteration:
          "Bismillaahir Rahmaanir Raheem. Qul huwal laahu ahad. Allaahus samad. Lam yalid wa lam yoolad. Wa lam yakul lahoo kufuwan ahad.",
        translation:
          'In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, "He is Allah, [who is] One. Allah, the Absolute Reference. He neither begets nor is born. Nor is there to Him any equivalent."',
        repetitions: 3,
      },
      {
        id: "18",
        arabic:
          "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\nقُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ\nمِن شَرِّ مَا خَلَقَ\nوَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ\nوَمِن شَرِّ ٱلنَّفَّـٰثَـٰتِ فِى ٱلْعُقَدِ\nوَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        transliteration:
          "Bismillaahir Rahmaanir Raheem. Qul a'oodhu bi rabbil-falaq. Min sharri maa khalaq. Wa min sharri ghaasiqin idhaa waqab. Wa min sharrin-naffaathaati fil-'uqad. Wa min sharri haasidin idhaa hasad.",
        translation:
          'In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, "I seek refuge in the Lord of daybreak. From the evil of that which He created. And from the evil of darkness when it settles. And from the evil of the blowers in knots. And from the evil of an envier when he envies."',
        repetitions: 3,
      },
      {
        id: "19",
        arabic:
          "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\nقُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ\nمَلِكِ ٱلنَّاسِ\nإِلَـٰهِ ٱلنَّاسِ\nمِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ\nٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ\nمِنَ ٱلْجِنَّةِ وَٱلنَّاسِ",
        transliteration:
          "Bismillaahir Rahmaanir Raheem. Qul a'oodhu bi rabbin-naas. Malikin-naas. Ilaahin-naas. Min sharril-waswaasil-khannaas. Alladhee yuwaswisu fee sudoorin-naas. Minal-jinnati wan-naas.",
        translation:
          'In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, "I seek refuge in the Lord of mankind. The Sovereign of mankind. The God of mankind. From the evil of the retreating whisperer. Who whispers [evil] into the breasts of mankind. From among the jinn and mankind."',
        repetitions: 3,
      },
      {
        id: "20",
        arabic:
          "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",
        transliteration:
          "Amsayna wa amsal-mulku lillah, walhamdulillah la ilaha illallahu wahdahu la sharika lah, lahul-mulku wa lahul-hamdu wa huwa 'ala kulli shay'in qadir. Rabbi as'aluka khayra ma fee hadhihil-laylati wa khayra ma ba'daha, wa a'udhu bika min sharri ma fee hadhihil-laylati wa sharri ma ba'daha. Rabbi a'udhu bika minal-kasali wa soo'il-kibar, Rabbi a'udhu bika min 'adhabin fin-nari wa 'adhabin fil-qabr.",
        translation:
          "We have entered the evening and at this very time the whole kingdom belongs to Allah. Praise is due to Allah. There is no deity except Allah, the Only One without any partner. His is the kingdom and to Him is praise due, and He is Powerful over everything. My Lord, I ask You for the good of this night and the good of what follows it, and I seek refuge in You from the evil of this night and the evil of what follows it. My Lord, I seek refuge in You from laziness and the hardships of old age. My Lord, I seek refuge in You from the torment of the Fire and the torment of the grave.",
        repetitions: 1,
      },
      {
        id: "21",
        arabic:
          "اللَّهُمَّ أَنْتَ رَبِّي، لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
        transliteration:
          "Allahumma Anta Rabbee la ilaha illa Ant, khalaqtanee wa ana 'abduk, wa ana 'ala 'ahdika wa wa'dika mas-tata't, a'oodhu bika min sharri ma sana't, aboo'u laka bini'matika 'alayya wa aboo'u laka bidhanbee faghfir lee fa innahu la yaghfirudh-dhunooba illa Ant.",
        translation:
          "O Allah, You are my Lord, there is no deity except You. You created me and I am Your servant, and I am faithful to my covenant and my promise to You as much as I am able. I seek refuge in You from the evil of what I have done. I acknowledge before You Your blessings upon me, and I acknowledge my sin, so forgive me, for indeed, no one forgives sins except You.",
        repetitions: 1,
      },
      {
        id: "22",
        arabic:
          "اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ",
        transliteration:
          "Allahumma innee amsaytu ushhiduka, wa ushhidu hamalata 'arshika, wa mala'ikataka, wa jamee'a khalqika, annaka Antallahu la ilaha illa Anta wahdaka la shareeka lak, wa anna Muhammadan 'abduka wa rasooluk.",
        translation:
          "O Allah, I have entered the evening and I call upon You, the bearers of Your Throne, Your angels, and all of Your creation to witness that You are Allah, there is no deity except You, Alone without partner, and that Muhammad is Your servant and Your Messenger.",
        repetitions: 4,
      },
      {
        id: "23",
        arabic:
          "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ، وَالْفَقْرِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ",
        transliteration:
          "Allahumma 'aafinee fee badanee, Allahumma 'aafinee fee sam'ee, Allahumma 'aafinee fee basaree, la ilaha illa Ant. Allahumma innee a'oodhu bika minal-kufri wal-faqr, Allahumma innee a'oodhu bika min 'adhabil-qabr, la ilaha illa Ant.",
        translation:
          "O Allah, grant me health in my body. O Allah, grant me health in my hearing. O Allah, grant me health in my sight. There is no deity except You. O Allah, I seek refuge in You from disbelief and poverty, and I seek refuge in You from the punishment of the grave. There is no deity except You.",
        repetitions: 3,
      },
      {
        id: "24",
        arabic:
          "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ ۖ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
        transliteration:
          "Hasbiyallahu la ilaha illa Huwa, 'alayhi tawakkaltu, wa Huwa Rabbul-'Arshil-'Adheem.",
        translation:
          "Sufficient for me is Allah; there is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne.",
        repetitions: 7,
      },
      {
        id: "25",
        arabic:
          "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي، اللَّهُمَّ اسْتُرْ عَوْرَاتِي، وَآمِنْ رَوْعَاتِي، اللَّهُمَّ احْفَظْنِي مِنْ بَيْنِ يَدَيَّ، وَمِنْ خَلْفِي، وَعَنْ يَمِينِي، وَعَنْ شِمَالِي، وَمِنْ فَوْقِي، وَأَعُوذُ بِعَظَمَتِكَ أَنْ أُغْتَالَ مِنْ تَحْتِي",
        transliteration:
          "Allahumma innee as'alukal-'afwa wal-'aafiyata fid-dunya wal-aakhirah. Allahumma innee as'alukal-'afwa wal-'aafiyata fee deenee wa dunyaya wa ahlee wa maalee. Allahummastur 'awraatee wa aamin raw'aatee. Allahummahfadhnee min bayni yadayya, wa min khalfee, wa 'an yameenee, wa 'an shimaalee, wa min fawqee, wa a'oodhu bi'adhamatika an ughtaala min tahtee.",
        translation:
          "O Allah, I ask You for forgiveness and well-being in this world and the Next. O Allah, I ask You for forgiveness and well-being in my religion, my worldly affairs, my family and my wealth. O Allah, conceal my faults and calm my fears. O Allah, guard me from before me and from behind me, from my right and from my left, and from above me, and I seek refuge in Your Greatness from being swallowed up from beneath me.",
        repetitions: 1,
      },
      {
        id: "26",
        arabic:
          "اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ، فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءًا أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ",
        transliteration:
          "Allahumma 'Aalimal-ghaybi wash-shahadah, Faatiras-samaawaati wal-ard, Rabba kulli shay'in wa maleekah, ashhadu an la ilaha illa Ant. A'oodhu bika min sharri nafsee wa min sharrish-shaytaani wa shirkih, wa an aqtarifa 'ala nafsee soo'an aw ajurrahoo ila muslim.",
        translation:
          "O Allah, Knower of the unseen and the seen, Creator of the heavens and the earth, Lord and Sovereign of all things, I bear witness that there is no deity except You. I seek refuge in You from the evil of myself and from the evil of Shaytan and his call to shirk, and from committing any evil against myself or bringing it upon another Muslim.",
        repetitions: 1,
      },
      {
        id: "27",
        arabic:
          "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
        transliteration:
          "Bismillahilladhee la yadurru ma'as-mihi shay'un fil-ardi wa la fis-samaa'i wa Huwas-Samee'ul-'Aleem.",
        translation:
          "In the name of Allah, with Whose name nothing can cause harm on earth or in the heaven, and He is the All-Hearing, the All-Knowing.",
        repetitions: 3,
      },
      {
        id: "28",
        arabic:
          "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ، اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذِهِ اللَّيْلَةِ فَتْحَهَا، وَنَصْرَهَا، وَنُورَهَا، وَبَرَكَتَهَا، وَهُدَاهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِيهَا وَشَرِّ مَا بَعْدَهَا",
        transliteration:
          "Amsayna wa amsal-mulku lillahi Rabbil-'aalameen. Allahumma innee as'aluka khayra hadhihil-laylati: fathaha, wa nasraha, wa nooraha, wa barakataha, wa hudaha, wa a'udhu bika min sharri ma feeha wa sharri ma ba'daha.",
        translation:
          "We have entered the evening and at this very time the whole kingdom belongs to Allah, Lord of the worlds. O Allah, I ask You for the goodness of this night: its victory, its assistance, its light, its blessings, and its guidance. And I seek refuge in You from the evil of what is in it and the evil of what follows it.",
        repetitions: 1,
      },
      {
        id: "29",
        arabic:
          "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        transliteration:
          "A'oodhu bikalimaatillaahit-taammaati min sharri ma khalaq.",
        translation:
          "I seek refuge in the Perfect Words of Allah from the evil of what He has created.",
        repetitions: 3,
      },
      {
        id: "30",
        arabic:
          "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ",
        transliteration:
          "Allahumma innee a'oodhu bika minal-hammi wal-hazani, wal-'ajzi wal-kasali, wal-bukhli wal-jubni, wa dala'id-dayni, wa ghalabatir-rijaal.",
        translation:
          "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men.",
        repetitions: 1,
      },
      {
        id: "31",
        arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
        transliteration:
          "Allahumma salli 'ala Muhammadin wa 'ala aali Muhammad.",
        translation:
          "O Allah, send prayers upon Muhammad and upon the family of Muhammad.",
        repetitions: 10,
      },
    ],
  },
  beforeSleep: {
    title: "Before Sleep Zikr",
    icon: "🌙",
    duas: [
      {
        id: "32",
        arabic:
          "ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُۥ مَا فِى ٱلسَّمَـٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۚ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۚ وَلَا يُحِيطُونَ بِشَىْءٍ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ ۚ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ",
        transliteration:
          "Allahu la ilaaha illa Huwal-Hayyul-Qayyeem. Laa ta'khudhuhu sinatun wa laa nawm. Lahu maa fis-samaawaati wa maa fil-ard. Man dhal-ladhee yashfa'u 'indahoo illa bi-idhnih. Ya'lamu maa bayna aydeehim wa maa khalfahum. Wa laa yuheetoona bishay-im-min 'ilmihee illa bimaa shaa'. Wasi'a kursiyyuhus-samaawaati wal-ard. Wa laa ya'ooduhu hifdhuhumaa wa Huwal-'Aliyyul-'Adheem.",
        translation:
          "Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is [presently] before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
        repetitions: 1,
      },
      {
        id: "33",
        arabic:
          "آمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِنْ رُسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْهِ الْمَصِيرُ * لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنْتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
        transliteration:
          "Aamanar-Rasoolu bimaa unzila ilayhi mir-Rabbihee wal-mo'minoon. Kullun aamana billahi wa malaaa'ikatihee wa kutubihee wa rusulih; laa nufarriqu bayna ahadim-mir-rusulih. Wa qaaloo sami'naa wa ata'naa ghufraanaka Rabbanaa wa ilaykal-maseer. Laa yukallifullaahu nafsan illaa wus'ahaa; lahaa maa kasabat wa 'alayhaa maktasabat. Rabbanaa laa tu'aakhidhnaaa in naseenaaa aw akhta'naa. Rabbanaa wa laa tahmil 'alaynaaa isran kamaa hamaltahoo 'alalladheena min qablinaa. Rabbanaa wa laa tuhammilnaa maa laa taaqata lanaa bih; wa'fu 'annaa waghfir lanaa warhamnaaa; Anta mawlaanaa fansurnaa 'alal-qawmil-kaafireen.",
        translation:
          "The Messenger ˹firmly˺ believes in what has been revealed to him from his Lord, and so do the believers. They ˹all˺ believe in Allah, His angels, His Books, and His messengers. ˹They proclaim,˺ “We make no distinction between any of His messengers.” And they say, “We hear and obey. ˹We seek˺ Your forgiveness, our Lord! And to You ˹alone˺ is the final return. Allah does not require of any soul more than what it can afford. All good will be for its own benefit, and all evil will be to its own loss. ˹The believers pray,˺ “Our Lord! Do not punish us if we forget or make a mistake. Our Lord! Do not place a burden on us like the one you placed on those before us. Our Lord! Do not burden us with what we cannot bear. Pardon us, forgive us, and have mercy on us. You are our ˹only˺ Guardian. So grant us victory over the disbelieving people.",
        repetitions: 1,
      },
      {
        id: "34",
        arabic:
          "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\nقُلْ هُوَ ٱللَّهُ أَحَدٌ\nٱللَّهُ ٱلصَّمَدُ\nلَمْ يَلِدْ وَلَمْ يُولَدْ\nوَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌ",
        transliteration:
          "Bismillaahir Rahmaanir Raheem. Qul huwal laahu ahad. Allaahus samad. Lam yalid wa lam yoolad. Wa lam yakul lahoo kufuwan ahad.",
        translation:
          'In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, "He is Allah, [who is] One. Allah, the Absolute Reference. He neither begets nor is born. Nor is there to Him any equivalent."',
        repetitions: 3,
      },
      {
        id: "35",
        arabic:
          "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\nقُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ\nمِن شَرِّ مَا خَلَقَ\nوَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ\nوَمِن شَرِّ ٱلنَّفَّـٰثَـٰتِ فِى ٱلْعُقَدِ\nوَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        transliteration:
          "Bismillaahir Rahmaanir Raheem. Qul a'oodhu bi rabbil-falaq. Min sharri maa khalaq. Wa min sharri ghaasiqin idhaa waqab. Wa min sharrin-naffaathaati fil-'uqad. Wa min sharri haasidin idhaa hasad.",
        translation:
          'In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, "I seek refuge in the Lord of daybreak. From the evil of that which He created. And from the evil of darkness when it settles. And from the evil of the blowers in knots. And from the evil of an envier when he envies."',
        repetitions: 3,
      },
      {
        id: "36",
        arabic:
          "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\nقُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ\nمَلِكِ ٱلنَّاسِ\nإِلَـٰهِ ٱلنَّاسِ\nمِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ\nٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ\nمِنَ ٱلْجِنَّةِ وَٱلنَّاسِ",
        transliteration:
          "Bismillaahir Rahmaanir Raheem. Qul a'oodhu bi rabbin-naas. Malikin-naas. Ilaahin-naas. Min sharril-waswaasil-khannaas. Alladhee yuwaswisu fee sudoorin-naas. Minal-jinnati wan-naas.",
        translation:
          'In the name of Allah, the Entirely Merciful, the Especially Merciful. Say, "I seek refuge in the Lord of mankind. The Sovereign of mankind. The God of mankind. From the evil of the retreating whisperer. Who whispers [evil] into the breasts of mankind. From among the jinn and mankind."',
        repetitions: 3,
      },
      {
        id: "37",
        arabic:
          "بِاسْمِكَ رَبِّ وَضَعْتُ جَنْبِي وَبِكَ أَرْفَعُهُ، إِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ",
        transliteration:
          "Bismika Rabbi wadad'tu janbee wa bika arfa'uh, in amsakta nafsee farhamhaa, wa in arsaltahaa fahfadhhaa bimaa tahfadhu bihee 'ibaadakas-saaliheen.",
        translation:
          "In Your name, my Lord, I lay down my side and by You I raise it. If You take my soul, then have mercy upon it, and if You release it, then protect it as You protect Your righteous servants.",
        repetitions: 1,
      },
      {
        id: "38",
        arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        transliteration: "Bismika-llahumma amootu wa ahyaa.",
        translation: "In Your name, O Allah, I die and I live.",
        repetitions: 1,
      },
      {
        id: "39",
        arabic:
          "اللَّهُمَّ إِنَّكَ خَلَقْتَ نَفْسِي وَأَنْتَ تَوَفَّاهَا ۖ لَكَ مَمَاتُهَا وَمَحْيَاهَا ۖ إِنْ أَحْيَيْتَهَا فَاحْفَظْهَا ۖ وَإِنْ أَمَتَّهَا فَاغْفِرْ لَهَا ۖ اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ",
        transliteration:
          "Allahumma innaka khalaqta nafsee wa Anta tawaffaaha, laka mamaatuhaa wa mahyaaha, in ahyaytahaa fahfadhhaa, wa in amattahaa faghfir lahaa. Allahumma innee as'alukal-'aafiyah.",
        translation:
          "O Allah, surely You have created my soul and You take it in death. To You belongs its death and its life. If You keep it alive, then protect it, and if You cause it to die, then forgive it. O Allah, I ask You for well-being.",
        repetitions: 1,
      },
      {
        id: "40",
        arabic:
          "اللَّهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ وَرَبَّ الْعَرْشِ الْعَظِيمِ، رَبَّنَا وَرَبَّ كُلِّ شَيْءٍ، فَالِقَ الْحَبِّ وَالنَّوَى، وَمُنْزِلَ التَّوْرَاةِ وَالْإِنْجِيلِ وَالْفُرْقَانِ، أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ شَيْءٍ أَنْتَ آخِذٌ بِنَاصِيَتِهِ، اللَّهُمَّ أَنْتَ الْأَوَّلُ فَلَيْسَ قَبْلَكَ شَيْءٌ، وَأَنْتَ الْآخِرُ فَلَيْسَ بَعْدَكَ شَيْءٌ، وَأَنْتَ الظَّاهِرُ فَلَيْسَ فَوْقَكَ شَيْءٌ، وَأَنْتَ الْبَاطِنُ فَلَيْسَ دُونَكَ شَيْءٌ، اقْضِ عَنَّا الدَّيْنَ، وَأَغْنِنَا مِنَ الْفَقْرِ",
        transliteration:
          "Allahumma Rabbas-samaawaatis-sab'i wa Rabbal-'Arshil-'Adheem, Rabbanaa wa Rabba kulli shay', faaliqal-habbi wan-nawaa, wa munzilat-Tawraati wal-Injeeli wal-Furqaan, a'oodhu bika min sharri kulli shay'in Anta aakhidhum-binaasiyatih. Allahumma Antal-Awwalu falaysa qablaka shay', wa Antal-Aakhiru falaysa ba'daka shay', wa Antadh-Dhaahiru falaysa fawqaka shay', wa Antal-Baatinu falaysa doonaka shay', iqdi 'annad-dayna wa aghninaa minal-faqr.",
        translation:
          "O Allah, Lord of the seven heavens and Lord of the Magnificent Throne, our Lord and Lord of all things, Splitter of the grain and the date stone, Revealer of the Torah, the Gospel, and the Criterion (the Quran). I seek refuge in You from the evil of everything You hold by its forelock. O Allah, You are the First and there is nothing before You; You are the Last and there is nothing after You; You are the Most High and there is nothing above You; and You are the Most Near and there is nothing nearer than You. Settle our debts for us and save us from poverty.",
        repetitions: 1,
      },
      {
        id: "41",
        arabic:
          "اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لَا مَلْجَأَ وَلَا مَنْجَا مِنْكَ إِلَّا إِلَيْكَ، آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ",
        transliteration:
          "Allahumma aslamtu nafsee ilayk, wa fawwadtu amree ilayk, wa wajjahtu wajhee ilayk, wa alja'tu dhahree ilayk, raghbatan wa rahbatan ilayk, laa malja'a wa laa manjaa minka illa ilayk, aamantu bikitaabikal-ladhee anzalt, wa binabiyyikal-ladhee arsalt.",
        translation:
          "O Allah, I submit myself to You, entrust my affairs to You, turn my face to You, and lay myself down before You, out of desire for You and fear of You. There is no refuge and no escape from You except to You. I believe in Your Book which You have revealed, and in Your Prophet whom You have sent.",
        repetitions: 1,
      },
      {
        id: "42",
        arabic:
          "اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ، فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ",
        transliteration:
          "Allahumma 'Aalimal-ghaybi wash-shahadah, Faatiras-samaawaati wal-ard, Rabba kulli shay'in wa maleekah, ashhadu an la ilaha illa Ant. A'oodhu bika min sharri nafsee wa min sharrish-shaytaani wa shirkih.",
        translation:
          "O Allah, Knower of the unseen and the seen, Creator of the heavens and the earth, Lord and Sovereign of all things, I bear witness that there is no deity except You. I seek refuge in You from the evil of myself and from the evil of Shaytan and his call to shirk.",
        repetitions: 1,
      },
      {
        id: "43",
        arabic:
          "بِسْمِ اللَّهِ وَضَعْتُ جَنْبِي، اللَّهُمَّ اغْفِرْ لِي ذَنْبِي، وَأَخْسِئْ شَيْطَانِي، وَفُكَّ رِهَانِي، وَاجْعَلْنِي فِي النَّدِيِّ الْأَعْلَى",
        transliteration:
          "Bismillaahi wadad'tu janbee. Allahummagh-fir lee dhanbee, wa akhsi' shaytaanee, wa fukka rihaanee, waj'alnee fin-nadiyyil-a'laa.",
        translation:
          "In the name of Allah, I lay down my side. O Allah, forgive my sin, drive away my devil, free me from my bondage, and place me in the highest assembly.",
        repetitions: 1,
      },
      {
        id: "44",
        arabic:
          "اللَّهُمَّ إِنِّي أَعُوذُ بِوَجْهِكَ الْكَرِيمِ، وَكَلِمَاتِكَ التَّامَّةِ، مِنْ شَرِّ مَا أَنْتَ آخِذٌ بِنَاصِيَتِهِ، اللَّهُمَّ أَنْتَ تَكْشِفُ الْمَغْرَمَ وَالْمَأْثَمَ، اللَّهُمَّ لَا يُهْزَمُ جُنْدُكَ، وَلَا يُخْلَفُ وَعْدُكَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ، سُبْحَانَكَ وَبِحَمْدِكَ",
        transliteration:
          "Allahumma innee a'oodhu bi-wajhikal-kareemi wa kalimaatikat-taammah, min sharri ma Anta aakhidhum-binaasiyatih. Allahumma Anta takshiful-maghrama wal-ma'tham. Allahumma la yuhzamu junduk, wa la yukhlafu wa'duk, wa la yanfa'u dhal-jaddi minkal-jadd. Subhaanaka wa bihamdik.",
        translation:
          "O Allah, I seek refuge in Your Noble Face and Your Perfect Words from the evil of what You hold by its forelock. O Allah, You remove debt and sin. O Allah, Your army cannot be defeated, Your promise cannot be broken, and the wealth of a wealthy person cannot avail him against You. Glory and praise be to You.",
        repetitions: 1,
      },
      {
        id: "45",
        arabic:
          "اللَّهُ أَكْبَرُ كَبِيرًا عَدَدَ الشَّفْعِ وَالْوِتْرِ، وَكَلِمَاتِ اللَّهِ التَّامَّاتِ الطَّيِّبَاتِ الْمُبَارَكَاتِ",
        transliteration:
          "Allahu Akbaru kabeeran 'adadash-shaf'i wal-witri, wa kalimaatillaahit-taammaatit-tayyibaatil-mubaarakaat.",
        translation:
          "Allah is the Most Great, an infinite number of times equal to the even and the odd [creations], and [equal to the number of] the Perfect, Good, and Blessed Words of Allah.",
        repetitions: 3,
      },
      {
        id: "46",
        arabic:
          "لَا إِلَهَ إِلَّا اللَّهُ عَدَدَ الشَّفْعِ وَالْوِتْرِ، وَكَلِمَاتِ اللَّهِ التَّامَّاتِ الطَّيِّبَاتِ الْمُبَارَكَاتِ",
        transliteration:
          "Laa ilaaha illallaahu 'adadash-shaf'i wal-witri, wa kalimaatillaahit-taammaatit-tayyibaatil-mubaarakaat.",
        translation:
          "There is no deity worthy of worship except Allah, an infinite number of times equal to the even and the odd [creations], and [equal to the number of] the Perfect, Good, and Blessed Words of Allah.",
        repetitions: 3,
      },
    ],
  },
};

// Load Zikr Data
export const loadZikrData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }
    await saveZikrData(defaultZikrData);
    return defaultZikrData;
  } catch (e) {
    console.error("Error loading data:", e);
    return defaultZikrData;
  }
};

export const saveZikrData = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    return true;
  } catch (e) {
    console.error("Error saving data:", e);
    return false;
  }
};

// Stats Functions
export const getTodayKey = () => {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
};

export const loadStats = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STATS_KEY);
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }
    return {};
  } catch (e) {
    console.error("Error loading stats:", e);
    return {};
  }
};

export const saveStats = async (stats) => {
  try {
    const jsonValue = JSON.stringify(stats);
    await AsyncStorage.setItem(STATS_KEY, jsonValue);
    console.log("Stats saved successfully:", stats);
    return true;
  } catch (e) {
    console.error("Error saving stats:", e);
    return false;
  }
};

export const updateZikrCompletion = async (
  zikrType,
  completedDuas,
  totalCount,
) => {
  try {
    // Load existing stats
    const stats = await loadStats();
    const todayKey = getTodayKey();

    console.log(
      "Updating completion for:",
      zikrType,
      "Completed:",
      completedDuas,
      "Total:",
      totalCount,
    );
    console.log("Today key:", todayKey);

    // Initialize today's entry if it doesn't exist
    if (!stats[todayKey]) {
      stats[todayKey] = {
        date: todayKey,
        morning: {
          completed: false,
          duasCompleted: 0,
          totalDuas: 0,
          timestamp: null,
        },
        afternoon: {
          completed: false,
          duasCompleted: 0,
          totalDuas: 0,
          timestamp: null,
        },
        beforeSleep: {
          completed: false,
          duasCompleted: 0,
          totalDuas: 0,
          timestamp: null,
        },
      };
    }

    // Update the specific zikr type
    stats[todayKey][zikrType] = {
      completed: completedDuas === totalCount,
      duasCompleted: completedDuas,
      totalDuas: totalCount,
      timestamp: new Date().toISOString(),
    };

    console.log("Updated stats for today:", stats[todayKey]);

    // Save back to storage
    await saveStats(stats);
    return stats;
  } catch (e) {
    console.error("Error updating stats:", e);
    return null;
  }
};

export const getStatsSummary = async () => {
  try {
    const stats = await loadStats();
    const todayKey = getTodayKey();
    const todayStats = stats[todayKey] || null;

    // Calculate total completions
    let totalCompletions = 0;
    let streak = 0;

    // Get all dates and sort them
    let dates = Object.keys(stats).sort();

    console.log("All dates in stats:", dates);

    // Calculate current streak (consecutive days with at least one completion)
    let currentStreak = 0;
    let todayChecked = false;

    // Check from today backwards
    for (let i = dates.length - 1; i >= 0; i--) {
      const date = dates[i];
      const dayStats = stats[date];
      const hasCompletedAny =
        dayStats.morning.completed ||
        dayStats.afternoon.completed ||
        dayStats.beforeSleep.completed;

      if (hasCompletedAny) {
        currentStreak++;
        todayChecked = true;
      } else {
        break;
      }
    }

    // Calculate total completions (each completed zikr type counts as 1)
    Object.keys(stats).forEach((date) => {
      const dayStats = stats[date];
      if (dayStats.morning.completed) totalCompletions++;
      if (dayStats.afternoon.completed) totalCompletions++;
      if (dayStats.beforeSleep.completed) totalCompletions++;
    });

    const summary = {
      todayStats,
      totalCompletions,
      streak: currentStreak,
      totalDays: Object.keys(stats).length,
    };

    console.log("Stats summary:", summary);

    return summary;
  } catch (e) {
    console.error("Error getting stats summary:", e);
    return {
      todayStats: null,
      totalCompletions: 0,
      streak: 0,
      totalDays: 0,
    };
  }
};
