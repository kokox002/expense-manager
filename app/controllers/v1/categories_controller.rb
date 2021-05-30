class V1::CategoriesController < ApplicationController
    def index
        render json: { categories: Category.all.map(&:index_hash) }
    end

    def create
        category = Category.create(category_params)

        if category.persisted?
            render json: { success: true, id: category.id }
        else
            render json: { success: false, message: category.errors.full_messages.join(". ") },
                status: :bad_request
        end
    end

    def update
        category = Category.find(category_params[:id])
        if category.blank?
            render json: { success: false, message: "Category not found." }, status: :bad_request
        else
            if category.update(category_params)
                render json: { success: true }
            else
                render json: { success: false, message: category.errors.full_messages.join(". ") }
            end
        end
    end

    def destroy
        category = Category.find(category_params[:id])
        if category.blank?
            render json: { success: false, message: "Category not found." }, status: :bad_request
        else
            if category.destroy
                render json: { success: true }
            else
                render json: { success: false, message: category.errors.full_messages.join(". ") }
            end
        end
    end

private
    def category_params
        params.require(:category).permit(:id, :title, :description)
    end
end
