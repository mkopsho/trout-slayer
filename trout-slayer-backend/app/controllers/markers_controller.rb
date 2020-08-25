class MarkersController < ApplicationController
  def index
    markers = Marker.all
    render json: markers, except: :updated_at
  end

  def create
    marker = Marker.create(marker_params)
    render json: marker, except: [:updated_at, :user_id]
  end

  def destroy
  end

  private
  
  def marker_params
    params.require(:marker).permit(:title, :description, :lat, :long, :user_id)
  end
end