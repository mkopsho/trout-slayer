class MarkersController < ApplicationController
  def index
    markers = Marker.all
    render json: markers, except: :updated_at
  end

  def create
    binding.pry
    marker = Marker.create(marker_params)
    render json: marker, except: [:updated_at, :user_id]
  end

  def destroy
  end

  private
  
  def marker_params
    params.require(:marker).permit(:title, :description, :fish_type, :weather_conditions, :lure_and_bait, :lat, :long, :user_id)
  end
end