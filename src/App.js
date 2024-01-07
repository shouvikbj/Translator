import React, { useState } from "react";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [loading, setLoading] = useState(false);

  const languages = {
    af: "afrikaans",
    sq: "albanian",
    am: "amharic",
    ar: "arabic",
    hy: "armenian",
    az: "azerbaijani",
    eu: "basque",
    be: "belarusian",
    bn: "bengali",
    bs: "bosnian",
    bg: "bulgarian",
    ca: "catalan",
    ceb: "cebuano",
    ny: "chichewa",
    "zh-cn": "chinese (simplified)",
    "zh-tw": "chinese (traditional)",
    co: "corsican",
    hr: "croatian",
    cs: "czech",
    da: "danish",
    nl: "dutch",
    en: "english",
    eo: "esperanto",
    et: "estonian",
    tl: "filipino",
    fi: "finnish",
    fr: "french",
    fy: "frisian",
    gl: "galician",
    ka: "georgian",
    de: "german",
    el: "greek",
    gu: "gujarati",
    ht: "haitian creole",
    ha: "hausa",
    haw: "hawaiian",
    iw: "hebrew",
    he: "hebrew",
    hi: "hindi",
    hmn: "hmong",
    hu: "hungarian",
    is: "icelandic",
    ig: "igbo",
    id: "indonesian",
    ga: "irish",
    it: "italian",
    ja: "japanese",
    jw: "javanese",
    kn: "kannada",
    kk: "kazakh",
    km: "khmer",
    ko: "korean",
    ku: "kurdish (kurmanji)",
    ky: "kyrgyz",
    lo: "lao",
    la: "latin",
    lv: "latvian",
    lt: "lithuanian",
    lb: "luxembourgish",
    mk: "macedonian",
    mg: "malagasy",
    ms: "malay",
    ml: "malayalam",
    mt: "maltese",
    mi: "maori",
    mr: "marathi",
    mn: "mongolian",
    my: "myanmar (burmese)",
    ne: "nepali",
    no: "norwegian",
    or: "odia",
    ps: "pashto",
    fa: "persian",
    pl: "polish",
    pt: "portuguese",
    pa: "punjabi",
    ro: "romanian",
    ru: "russian",
    sm: "samoan",
    gd: "scots gaelic",
    sr: "serbian",
    st: "sesotho",
    sn: "shona",
    sd: "sindhi",
    si: "sinhala",
    sk: "slovak",
    sl: "slovenian",
    so: "somali",
    es: "spanish",
    su: "sundanese",
    sw: "swahili",
    sv: "swedish",
    tg: "tajik",
    ta: "tamil",
    te: "telugu",
    th: "thai",
    tr: "turkish",
    uk: "ukrainian",
    ur: "urdu",
    ug: "uyghur",
    uz: "uzbek",
    vi: "vietnamese",
    cy: "welsh",
    xh: "xhosa",
    yi: "yiddish",
    yo: "yoruba",
    zu: "zulu",
  };

  const handleTranslate = async () => {
    if(inputText === ""){
      alert("Input field cannot be empty!")
    }
    else{
      setLoading(true);
      setTranslatedText("")
      const dataToSend = {
        selectedLanguage,
        inputText
      }
      await fetch("https://gptranslatorapi.pythonanywhere.com/api/translate", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dataToSend)
      })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if(data.status === "ok"){
          setTranslatedText(data.translatedText)
        }
        else{
          alert(data.message)
        }
      })
      setLoading(false)
    }
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-md w-full max-w-md mb-4">
        <h1 className="text-2xl font-bold mb-4">Translator</h1>
        <label htmlFor="languageSelector" className="text-white mb-2">
          Select Language
        </label>
        <select
          id="languageSelector"
          className="border w-full p-2 mb-4 bg-gray-700 text-white rounded-full"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          {Object.entries(languages).map(([code, name]) => (
            <option key={code}>{`${name}`}</option>
          ))}
        </select>
        <label className="text-white mb-2">Enter text to translate</label>
        <textarea
          className="border w-full p-2 mb-4 bg-gray-700 text-white rounded-2xl"
          placeholder="language will be auto detected"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full float-right hover:bg-blue-600"
          onClick={handleTranslate}
        >
          Translate
        </button>
        <br/><br/><br/>
        {loading && <div className="mt-4 text-white">Translating...</div>}
        {translatedText && (
          <div className="mt-4 text-white">
            <strong>Translated Text:</strong>
            <p className="mt-2">{translatedText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
