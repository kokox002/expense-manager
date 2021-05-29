class V1::CategoriesController < ApplicationController
    def index
        render json: { categories: Category.all.map(&:index_hash) }
    end
end
