class CreateExpenses < ActiveRecord::Migration[6.1]
  def change
    create_table :expenses, id: :uuid do |t|
      t.string :title, null: false
      t.text :description
      t.decimal :value, precision: 10, scale: 2, null: false
      t.datetime :date, null: false
      t.references :category, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
