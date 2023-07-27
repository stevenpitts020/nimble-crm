import { RouteProps } from 'react-router-dom'

// Temporary Page
import DemoPage from '../pages/main/DemoPage'
import AuditPage from '../pages/audit/AuditPage'
import ClientsPage from '../pages/clients/ClientsPage'
import EmployeeHomePage from '../pages/home/EmployeeHomePage'
import ExecutiveHomePage from '../pages/home/ExecutiveHomePage'
import OpportunitiesPage from '../pages/opportunities/OpportunitiesPage'
import PricingPage from '../pages/pricing/PricingPage'
import ProspectPage from '../pages/prospects/ProspectPage'

interface IRoute extends RouteProps {
  key: string
}

/* NOTE: Deprecated. This is only used for static routes. Open MainContainer and set custom routes there. */
export const Routes: IRoute[] = [
  {
    component: ClientsPage,
    key: 'Clients',
    path: '/clients',
  },
  {
    component: ProspectPage,
    key: 'Prospects',
    path: '/prospects',
  },
  {
    component: AuditPage,
    key: 'Audits',
    path: '/audits',
  },
  {
    component: PricingPage,
    key: 'Pricing',
    path: '/pricing',
  },
  {
    component: OpportunitiesPage,
    key: 'Opportunities',
    path: '/opportunities',
  },
  {
    component: ExecutiveHomePage,
    key: '/ExecutiveDashboard',
    path: '/executive-dashboard',
  },
  {
    component: EmployeeHomePage,
    key: 'EmployeeHome',
    path: '/employee-dashboard',
  },
  {
    component: DemoPage,
    key: 'DEMO',
    path: '/demo',
  },
]
