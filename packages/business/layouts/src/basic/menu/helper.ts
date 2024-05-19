import type { MenuRecordRaw } from '@vben-core/typings';

function findMenuByPath(
  list: MenuRecordRaw[],
  path?: string,
): MenuRecordRaw | null {
  for (const menu of list) {
    if (menu.path === path) {
      return menu;
    }
    if (menu?.children?.length) {
      const findMenu = findMenuByPath(menu.children, path);
      if (findMenu) {
        return findMenu;
      }
    }
  }
  return null;
}

/**
 * 查找根菜单
 * @param menus
 * @param path
 */
function findRootMenuByPath(menus: MenuRecordRaw[], path?: string) {
  const findMenu = findMenuByPath(menus, path);
  const rootMenuPath = findMenu?.parents?.[0];
  const rootMenu = menus.find((item) => item.path === rootMenuPath);
  return {
    findMenu,
    rootMenu,
    rootMenuPath,
  };
}

export { findMenuByPath, findRootMenuByPath };
