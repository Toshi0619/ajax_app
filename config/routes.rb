Rails.application.routes.draw do
  root to: 'posts#index' #root_pathをindexビューに設定。
  # get 'posts/new', to: 'posts#new'
  post 'posts', to: 'posts#create'
  get 'posts/:id', to: 'posts#checked' #/:idでpathパラメーターを指定。
end
