export class FavoriteUtils {

  static isFavorite(
    favoriteIds: number[],
    productId: number
  ): boolean {
    return favoriteIds.includes(productId);
  }

  static addFavorite(
    favoriteIds: number[],
    productId: number
  ): number[] {

    if (FavoriteUtils.isFavorite(favoriteIds, productId)) {
      return favoriteIds;
    }

    return [...favoriteIds, productId];
  }

  static removeFavorite(
    favoriteIds: number[],
    productId: number
  ): number[] {

    return favoriteIds.filter(
      id => id !== productId
    );
  }

}

