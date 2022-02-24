enum actions {
  ADD_ARTICLE = "ADD_ARTICLE",
  REMOVE_ARTICLE = "REMOVE_ARTICLE",
}

const initialState: ArticleState = {
  data: [],
};

export function addArticleAction(article: IArticle) {
  const action: ArticleAction = {
    type: actions.ADD_ARTICLE,
    article,
  };
  return action;
}

export function removeArticleAction(article: IArticle) {
  const action: ArticleAction = {
    type: actions.REMOVE_ARTICLE,
    article,
  };
  return action;
}

const reducer = (
  state: ArticleState = initialState,
  action: ArticleAction
): ArticleState => {
  switch (action.type) {
    case actions.ADD_ARTICLE:
      const newArticle: IArticle = {
        id: Math.random(), // not really unique
        title: action.article.title,
        body: action.article.body,
      };
      return {
        ...state,
        data: state.data.concat(newArticle),
      };
    case actions.REMOVE_ARTICLE:
      const updatedArticles: IArticle[] = state.data.filter(
        (article) => article.id !== action.article.id
      );
      return {
        ...state,
        data: updatedArticles,
      };
  }
  return state;
};

export default reducer;
