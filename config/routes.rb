Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :v1, defaults: { format: 'json' } do
    get "categories", to: "categories#index"
    post "add_category", to: "categories#create"
    post "edit_category", to: "categories#update"
    post "delete_category", to: "categories#destroy"

    post "add_expense", to: "expenses#create"
    post "edit_expense", to: "expenses#update"
    post "delete_expense", to: "expenses#destroy"
  end

  get "*page", to: "home#index", constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
  root "home#index"
end
