/** UserState */
export interface UserState {
  /** 用户信息 */
  userInfo: UserInfo;
  // /** 用户权限菜单 */
  // userMenu: UserMenu[];
  // /** 用户权限按钮 */
  // userButton: UserButton[];
  // /** 用户权限路由 */
  // userRoute: UserRoute[];
  // /** 用户权限标识 */
  // userAuth: UserAuth;
  /** token */
  token: string;
}
export interface UserInfo {
  /** 用户名 */
  username: string;
  /** 用户头像 */
  avatar: string;
  /** 用户邮箱 */
  email: string;
  /** 用户手机号 */
  phone: string;
  /** 用户角色 */
  roles: string[];
  /** 用户权限 */
  permissions: string[];
}
