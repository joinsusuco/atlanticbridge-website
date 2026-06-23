export const metadata = {
  title: "Admin | Kalajulas Xpress",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <style>{`
        .admin-layout ~ footer { display: none !important; }
      `}</style>
      {children}
    </div>
  );
}
