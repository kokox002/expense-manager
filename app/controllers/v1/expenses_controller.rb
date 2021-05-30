class V1::ExpensesController < ApplicationController
    def create
        expense = Expense.create(expense_params)

        if expense.persisted?
            render json: { success: true, id: expense.id }
        else
            render json: { success: false, message: expense.errors.full_messages.join(". ") },
                status: :bad_request
        end
    end

    def update
        expense = Expense.find(expense_params[:id])
        if expense.blank?
            render json: { success: false, message: "expense not found." }, status: :bad_request
        else
            if expense.update(expense_params)
                render json: { success: true }
            else
                render json: { success: false, message: expense.errors.full_messages.join(". ") }
            end
        end
    end

    def destroy
        expense = Expense.find(expense_params[:id])
        if expense.blank?
            render json: { success: false, message: "expense not found." }, status: :bad_request
        else
            if expense.destroy
                render json: { success: true }
            else
                render json: { success: false, message: expense.errors.full_messages.join(". ") }
            end
        end
    end

private
    def expense_params
        params.require(:expense).permit(:id, :title, :description, :date, :value, :category_id)
    end
end
