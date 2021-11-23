interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostExtended extends Post {
  isFavorite: boolean;
}

export {
  PostExtended,
  Post
}
