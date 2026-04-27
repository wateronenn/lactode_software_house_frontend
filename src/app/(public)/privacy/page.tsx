import BackButton from '@/src/components/common/BackButton';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: '1. Information we collect',
      body: 'We collect account details such as your name, username, email address, telephone number, password, booking details, favorite hotels, and information you provide when using the hotel booking service.',
    },
    {
      title: '2. How we use your information',
      body: 'We use your information to create and manage your account, process hotel bookings, show your booking history, support hotel comparison and favorites, improve the service, and protect the platform from misuse.',
    },
    {
      title: '3. Sharing of information',
      body: 'We may share booking-related information with hotel owners or administrators when needed to manage reservations. We do not sell your personal information.',
    },
    {
      title: '4. Data storage and security',
      body: 'We apply reasonable technical and organizational safeguards to protect your personal data. Access is limited to users and roles that need the information to operate the service.',
    },
    {
      title: '5. Your rights',
      body: 'You may request access to your personal data, correction of inaccurate data, deletion where applicable, or withdrawal of consent for non-essential processing, subject to system and legal requirements.',
    },
    {
      title: '6. Retention',
      body: 'We keep personal data only as long as needed for account management, booking records, service operation, dispute handling, and legal or academic project requirements.',
    },
  ];

  return (
    <main className="px-4 py-12 sm:px-6 lg:px-8" data-testid="privacy-page">
      <section className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-soft">
        <div className="bg-[var(--color-primary)] px-6 py-10 text-white sm:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-white/75">
            Privacy Policy
          </p>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-5xl">
            Personal Data Protection Notice
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85">
            This notice explains how LACTODE SOFEWARE HOUSE collects, uses, and protects personal data when you register, sign in, browse hotels, or make bookings.
          </p>
        </div>

        <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-600">
            <p>
              By creating an account or using this service, you acknowledge that your personal data will be processed as described in this policy.
            </p>
          </div>

          <div className="grid gap-5">
            {sections.map((section) => (
              <article key={section.title} className="rounded-3xl border border-slate-200 p-5">
                <h2 className="text-lg font-bold text-slate-950">{section.title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{section.body}</p>
              </article>
            ))}
          </div>

          <div className="rounded-3xl bg-slate-950 p-6 text-white">
            <h2 className="text-xl font-bold">Contact</h2>
            <p className="mt-3 leading-7 text-white/75">
              If you have questions about this privacy policy or want to exercise your data rights, please contact the project administrator or support team responsible for this hotel booking system.
            </p>
          </div>

          <p className="text-sm text-slate-500">
            Last updated: April 27, 2026
          </p>

          <div className="flex justify-end border-t border-slate-200 pt-6">
            <BackButton fallbackHref="/register" />
          </div>
        </div>
      </section>
    </main>
  );
}
