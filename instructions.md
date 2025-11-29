# Analytics Module Setup Instructions

## 1. Database Setup
The Prisma schema has been updated to include the `AnalyticReport` model. You need to push these changes to your database.

Run the following command:
```bash
npx prisma db push
```

## 2. Firebase Storage
Ensure your Firebase Storage rules allow read and write operations. For development, you can use:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true; // WARNING: Secure this for production!
    }
  }
}
```

Make sure your `.env` file contains the necessary Firebase configuration keys (`NEXT_PUBLIC_FIREBASE_...`).

## 3. Dependencies
The following packages are used:
- `@react-pdf/renderer`: For generating PDF reports.
- `firebase`: For storing generated reports.
- `lucide-react`: For icons.
- `sonner`: For toast notifications.

These are already installed in your project.

## 4. Usage
1. Navigate to `/admin/analytics` via the sidebar.
2. Select a Start Date and End Date.
3. Click "Generate Analysis".
4. The system will:
   - Calculate submission stats from the database.
   - Generate a PDF report with charts and AI summary.
   - Upload the PDF to Firebase.
   - Save the record to the database.
5. The report will appear in the history table below.

## Notes
- **AI Simulation**: The AI analysis is currently mocked (`getAIAnalysis` in `actions/analytics.ts`). You can replace this with a real call to OpenAI or Gemini API.
- **Date Picker**: Native HTML date inputs are used for simplicity. You can upgrade to `shadcn/ui` Calendar component if you install `date-fns` and `react-day-picker`.
