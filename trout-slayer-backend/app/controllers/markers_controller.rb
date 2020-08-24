class MarkersController < ApplicationController
  def index
    markers = Marker.all
    render json: markers, except: :updated_at
  end

  def create
  end

  def destroy
  end
end