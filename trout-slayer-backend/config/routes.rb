Rails.application.routes.draw do
  root 'markers#index'
  resources :users, only: [:create]
  resources :sessions, only: [:create]
  resources :markers, except: [:update]
end
