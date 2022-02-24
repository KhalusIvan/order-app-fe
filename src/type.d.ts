interface IArticle {
  id: number;
  title: string;
  body: string;
}

type ArticleState = {
  data: IArticle[];
};

type ArticleAction = {
  type: string;
  article: IArticle;
};

type DispatchType = (args: ArticleAction) => ArticleAction;
