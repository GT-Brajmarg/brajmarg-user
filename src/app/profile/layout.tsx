// import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

// export default function AccountLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <main className="bg-[#F8F2E8]">
//       <div className="mx-auto max-w-[1440px] px-6 py-8">
//         <div className="flex gap-8">
//           <aside className="w-[270px] shrink-0">
//             <DashboardSidebar />
//           </aside>

//           <section className="min-w-0 flex-1">{children}</section>
//         </div>
//       </div>
//     </main>
//   );
// }
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
