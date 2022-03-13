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
//from here
type DispatchType = (args: ArticleAction) => ArticleAction;

type AlertAction = {
  type: string;
  payload: Alert;
};
