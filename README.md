# משימת סיום קורס AI N8N

סשה גנם - קורס n8n, מרצה עופר שלי, אוניברסיטת אריאל.

המאגר כולל את שני ה-WORKFLOWS של משימת הסיום, ואת קבצי ה-HTML/CSS/JS
של הטמעת הצ'ט למשימה הראשונה.

---

## מבנה המאגר

```
n8n_final/
├── mission1/
│   ├── company_chat.json      ← ה-WORKFLOW של הצ'ט בוט
│   ├── chat.html              ← העמוד שבו הצ'ט מוטמע
│   ├── chat.css               ← העיצוב, כולל הכתום בחלק העליון
│   └── chat.js                ← createChat של @n8n/chat
└── mission2/
    └── birthday_blessing.json ← ה-WORKFLOW של ברכות יום הולדת
```

---

## משימה 1 - צ'ט בוט

**ה-WORKFLOW:** `mission1/lore_chat.json`

| נוד | תפקיד |
| --- | --- |
| `When chat message received` (Chat Trigger) | נקודת הכניסה של הצ'ט |
| `AI Agent` | הסוכן, עם ה-PROMPT של ROLE / TASK / DETAILS |
| `Google Gemini Chat Model` | המודל |
| `Simple Memory` | זיכרון של **15** הודעות אחרונות |
| `lore_info` (HTTP Request Tool) | מושך את קובץ ה-TXT מ-GitHub |

הסוכן עונה רק על שאלות שקשורות לגוף שנבחר. כששואלים אותו על נושא אחר
או על מתחרים הוא מסרב בנימוס ומפנה לאתר הרשמי.

**קובץ המידע:** קובץ TXT שהועלה ל-GitHub, ואליו הסוכן פונה בבקשת HTTP.

**הטמעת הצ'ט:** `chat.html` טוען את `@n8n/chat` מ-CDN, ו-`chat.css` צובע את
**החלק העליון של הצ'ט בכתום** דרך המשתנה `--chat--header--background`.

---

## משימה 2 - ברכות יום הולדת

**ה-WORKFLOW:** `mission2/birthday_blessing.json`

```
Webhook → Basic LLM Chain → Airtable → Brevo → Respond to Webhook
```

### הטופס / ה-WEBHOOK שולח 5 פרטים

| מפתח ב-BODY | הסבר |
| --- | --- |
| `ToName` | שם האדם שהברכה מיועדת לו |
| `FromName` | שם האדם שייצר את הברכה |
| `Gender` | זכר / נקבה |
| `Topics` | תיאור הנושאים שמקבל הברכה אוהב |
| `Email` | מייל מקבל הברכה |

### דוגמה לבקשה ב-Postman

```json
{
  "ToName": "דנה",
  "FromName": "סחה",
  "Gender": "נקבה",
  "Topics": "טיולים בטבע, קפה טוב ומשחקי מחשב",
  "Email": "dana@example.com"
}
```

### הקולקשן ב-AIRTABLE - 6 עמודות (מלבד ה-ID)

| עמודה | סוג | מקור |
| --- | --- | --- |
| `ToName` | Single line text | מהטופס |
| `FromName` | Single line text | מהטופס |
| `Gender` | Single line text | מהטופס |
| `Topics` | Long text | מהטופס |
| `Blessing` | Long text | **מה שה-AI ייצר** |
| `Email` | Single line text | מהטופס |

### מה חוזר ל-RESPONSE

```json
{
  "msg": "הברכה נוצרה ונשלחת ברגעים אלה לנמען",
  "to": "דנה",
  "email": "dana@example.com",
  "blessing": "..."
}
```

המאפיין `blessing` מכיל את הברכה שנשלחה במייל, כפי שנדרש במשימה.

---

## איך מייבאים ומריצים

1. ב-n8n: **Import from File** לכל אחד משני קבצי ה-JSON.
2. לבחור מחדש את ה-CREDENTIALS בכל נוד שדורש אותם - ייצוא של n8n
   אף פעם לא מכיל סודות, רק הפניות:
   - `Google Gemini Chat Model` → Google Gemini (PaLM) API
   - `Create a record` → Airtable Personal Access Token
   - `Send a transactional email` → Brevo API
3. במשימה 2, לבחור את הטבלה ב-AIRTABLE אחרי שיוצרים אותה עם 6 העמודות.
4. במשימה 1, ללחוץ **Publish** ולהעתיק את כתובת ה-Chat Trigger לתוך
   `chat.js`, למשתנה `WEBHOOK_URL`.
5. בנוד `Send a transactional email`, השדה `sender` חייב להיות כתובת
   מאומתת ב-Brevo.
