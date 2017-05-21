class Api::CollectionsController < ApplicationController
  before_filter :ensure_logged_in

  def index
    @collections = current_user.collections
  end

  def create
    @collection = Collection.new(
      user_id: current_user.id,
      title: collection_params[:title]
    )

    if @collection.save
      render :show, @collection
    else
      render json: @collection.errors.full_messages, status: 422
    end
  end

  def destroy
    @collection = Collection.find(params[:id])
    if @collection
      @collection.destroy
      render :show, @collection
    else
      render json: ["Collection does not exist"], status: 404
    end
  end

  def update
    @collection = Collection.find(params[:id])
    if @collection
      if @collection.update(collection_params)
      else
        render json: @collection.errors.full_messages, status: 422
      end
    else
      render json: ["Collection does not exist"], status: 404
    end
  end

  private
  def collection_params
    params.require(:collection).permit(:title)
  end
end