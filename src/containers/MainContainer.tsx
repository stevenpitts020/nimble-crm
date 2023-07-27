import React, { useContext, useEffect } from 'react'
import {
  Route,
  Switch,
  Redirect,
  RouteComponentProps,
  useLocation,
} from 'react-router-dom'

import _ from 'lodash'
import { Layout } from 'antd'
import TagManager from 'react-gtm-module'

import { HeaderNavigation } from '../components'
import { Routes } from '../router/Routes'

/* Our Context */
import { AuthContextStore } from '../store/AuthProvider'
import { ProfileProvider, ProfileContext } from '../store/ProfileProvider'
import { AccountRequestDetailProvider } from '../store/AccountRequestDetailProvider'
import { AlertProvider } from '../store/AlertProvider'
import { RequestPasswordProvider } from '../store/RequestPasswordProvider'
import LocationHelper from '../utils/LocationHelper'

/* Pages */
import LoginPage from '../pages/auth/LoginPage'
import ChangePassword from '../pages/ChangePassword/ChangePassword'
import RequestPassword from '../pages/RequestPassword/RequestPassword'
import ResetPassword from '../pages/ResetPassword/ResetPassword'
import ErrorPassword from '../pages/ErrorPassword/ErrorPassword'
import AccountRequestDetail from '../pages/AccountRequestDetail/AccountRequestDetail'
import NotFoundPage from '../pages/other/NotFoundPage'
import { AlertMessage } from '../components'
import { AccountRequestProvider } from '../store/AccountRequestProvider'
import AccountRequestList from '../pages/AccountRequestList/AccountRequestList'
import { ProfilesProvider } from '../store/ProfilesProvider'
import Labs from '../pages/Labs/Labs'
import UserList from '../pages/UserList/UserList'
import { UserListProvider } from '../store/UserListProvider'
import UserDetail from '../pages/UserDetail/UserDetail'
import { UserDetailProvider } from '../store/UserDetailProvider'
import RequestPhone from '../pages/RequestPhone/RequestPhone'
import RequestVerification from '../pages/RequestVerification/RequestVerification'
import InstitutionList from '../pages/InstitutionList/InstitutionList'
import InstitutionSettings from '../pages/InstitutionSettings/InstitutionSettings'
import InstitutionTemplates from '../pages/InstitutionTemplates/InstitutionTemplates'
import ProductList from '../pages/ProductList/ProductList'
import { InstitutionListProvider } from '../store/InstitutionListProvider'
import { ProductListProvider } from '../store/ProductListProvider'
import { InstitutionProvider } from '../store/InstitutionProvider'
import InstitutionBranchList from '../pages/InstitutionBranchList/InstitutionBranchList'
import { InstitutionBranchListProvider } from '../store/InstitutionBranchListProvider'
import { BaseRateProvider } from '../store/BaseRateProvider'

/* Helper for setting up a private route with authentication */
const PrivateRoute: React.ComponentType<any> = ({
  component,
  roles,
  ...rest
}) => {
  if (!component) throw Error('component is undefined')

  const { isAuthenticated, hasPhone } = useContext(AuthContextStore)
  const { profileState } = useContext(ProfileContext)
  // Note: JSX Elements have to be uppercase
  const Component = component

  const renderRoute = (props: RouteComponentProps<any>): React.ReactNode => {
    if (!isAuthenticated()) {
      LocationHelper.setLink(props.location)
      return <Redirect to={{ pathname: '/login' }} />
    }

    if (!hasPhone(profileState.profile)) {
      LocationHelper.setLink(props.location)
      return <Redirect to={{ pathname: '/phone' }} />
    }

    if (
      profileState.profile &&
      !_.isEmpty(roles) &&
      _.isEmpty(_.intersection(roles, profileState.profile.roles))
    ) {
      // requires a role which `me` does not have
      return <Redirect to={{ pathname: '/login' }} />
    }

    if (profileState.profile && profileState.profile.institution) {
      // Add institution data layer to GTM
      TagManager.dataLayer({
        dataLayer: {
          institution_name: profileState.profile?.institution.name,
          user_id: profileState.profile?.id,
        },
      })
    }

    return <Component {...props} />
  }

  return <Route {...rest} render={renderRoute} />
}

const MainContainer: React.FC = () => {
  const { Content } = Layout

  const { isAuthenticated } = useContext(AuthContextStore)

  const location = useLocation()
  useEffect(() => {
    document.title = LocationHelper.getLocationTitle(location.pathname)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <ProfileProvider>
      {isAuthenticated() && <HeaderNavigation />}
      <AlertProvider>
        <ProfilesProvider>
          <AccountRequestProvider>
            <AccountRequestDetailProvider>
              <UserListProvider>
                <InstitutionListProvider>
                  <ProductListProvider>
                    <InstitutionProvider>
                      <InstitutionBranchListProvider>
                        <UserDetailProvider>
                          <BaseRateProvider>
                            <RequestPasswordProvider>
                              <AlertMessage />
                              <Content className="main-container">
                                <Switch>
                                  <Route path="/" exact={true} key="home">
                                    <Redirect to={{ pathname: '/accounts' }} />
                                  </Route>
                                  <Route
                                    path="/login"
                                    exact={true}
                                    key="login"
                                    component={LoginPage}
                                  />
                                  <Route
                                    path="/login/:email/:token"
                                    exact={true}
                                    key="login-token"
                                    component={LoginPage}
                                  />
                                  <PrivateRoute
                                    path="/auth/change-password"
                                    exact={true}
                                    key="changePassword"
                                    component={ChangePassword}
                                  />
                                  <PrivateRoute
                                    path="/accounts"
                                    exact={true}
                                    key="AccountRequestList"
                                    component={AccountRequestList}
                                  />
                                  <PrivateRoute
                                    path="/accounts/:id"
                                    key="AccountRequestDetail"
                                    exact={true}
                                    component={AccountRequestDetail}
                                  />
                                  <PrivateRoute
                                    path="/labs"
                                    key="Labs"
                                    exact={true}
                                    component={Labs}
                                  />
                                  <PrivateRoute
                                    path="/users"
                                    key="UserList"
                                    exact={true}
                                    roles={[
                                      'super-admin',
                                      'institution-admin',
                                      'branch-admin',
                                    ]}
                                    component={UserList}
                                  />
                                  <PrivateRoute
                                    path="/institutions"
                                    key="InstitutionList"
                                    exact={true}
                                    roles={['super-admin']}
                                    component={InstitutionList}
                                  />
                                  <PrivateRoute
                                    path="/institutions/:domain/settings"
                                    key="InstitutionSettings"
                                    exact={true}
                                    roles={['super-admin', 'institution-admin']}
                                    component={InstitutionSettings}
                                  />
                                  <PrivateRoute
                                    path="/institution-templates/:domain"
                                    key="InstitutionTemplates"
                                    exact={true}
                                    roles={['super-admin']}
                                    component={InstitutionTemplates}
                                  />
                                  <PrivateRoute
                                    path="/products/:domain"
                                    key="ProductList"
                                    exact={true}
                                    roles={['super-admin']}
                                    component={ProductList}
                                  />
                                  <PrivateRoute
                                    path="/branches"
                                    key="InstitutionBranchList"
                                    exact={true}
                                    roles={['super-admin', 'institution-admin']}
                                    component={InstitutionBranchList}
                                  />
                                  <PrivateRoute
                                    path="/users/:id"
                                    key="UserDetail"
                                    exact={true}
                                    component={UserDetail}
                                  />
                                  {Routes.map(route => (
                                    <PrivateRoute
                                      key={route.key}
                                      path={route.path}
                                      exact={route.exact}
                                      component={route.component}
                                    />
                                  ))}

                                  <Route
                                    path="/auth/request-password"
                                    exact={true}
                                    key="requestPassLink"
                                    component={RequestPassword}
                                  />
                                  <Route
                                    path="/auth/:email/recover-password/:code/:expireAt"
                                    exact={true}
                                    key="resetPass"
                                    component={ResetPassword}
                                  />
                                  <Route
                                    path="/auth/:email/set-password/:code/:expireAt"
                                    exact={true}
                                    key="resetPass"
                                    component={ResetPassword}
                                  />
                                  <Route
                                    path="/auth/error/:code"
                                    exact={true}
                                    key="errorPassword"
                                    component={ErrorPassword}
                                  />
                                  <Route
                                    path="/phone"
                                    key="phone"
                                    exact={true}
                                    component={RequestPhone}
                                  />
                                  <Route
                                    path="/mfa"
                                    key="mfa"
                                    exact={true}
                                    component={RequestVerification}
                                  />
                                  <Route path="*" component={NotFoundPage} />
                                </Switch>
                              </Content>
                            </RequestPasswordProvider>
                          </BaseRateProvider>
                        </UserDetailProvider>
                      </InstitutionBranchListProvider>
                    </InstitutionProvider>
                  </ProductListProvider>
                </InstitutionListProvider>
              </UserListProvider>
            </AccountRequestDetailProvider>
          </AccountRequestProvider>
        </ProfilesProvider>
      </AlertProvider>
    </ProfileProvider>
  )
}

export default MainContainer
