Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :v1, defaults: { format: 'json' } do
    get 'categories', to: 'categories#index'
  end

  get "*page", to: "home#index", constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
  root "home#index"
end
