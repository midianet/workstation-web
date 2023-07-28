import Layout from "@/components/template/Layout";
import Dashboard from "../components/dashboard/Dashboard";

export default function Home() {
  return (
    <Layout title="Workstation - Devops Manager">
        <div>
          <Dashboard/>
        </div>
    </Layout>
  )
}
