class MarkersController < ApplicationController
  def index
    markers = Marker.all
    render json: markers, except: [:created_at, :updated_at]
  end

  def create
    marker = Marker.create(marker_params)
    render json: marker, except: [:created_at, :updated_at, :user_id]
  end

  def destroy
    marker = Marker.find_by(id: params[:id])
    marker.destroy
    render json: marker, except: [:created_at, :updated_at]
  end

  private
  
  def marker_params
    params.require(:marker).permit(:title, :description, :fish_type, :weather_conditions, :lure_and_bait, :lat, :long, :user_id, :id)
  end
end