class CapturesController < ApplicationController
  before_action :load_capture, only: [:show, :edit, :update, :upload]

  def show
  end

  def new
    load_capture_for_creation
  end

  def create
    session.delete(:capture_id)
  end

  def update
    session.delete(:capture_id)
    @capture.update(capture_params)

    redirect_to @capture
  end

  def upload # POST
    @image = @capture.images.new(
      file: params[:file]
    )

    respond_to do |format|
      if @image.save
        format.json { head :ok }
      else
        format.json { head :fail }
      end
    end
  end

private

  def capture_params
    params.require(:capture).permit(:title, :description, :url)
  end

  def load_capture_for_creation
    if session[:capture_id].present?
      @capture = Capture.find session[:capture_id]
    else
      @capture = Capture.create
      session[:capture_id] = @capture.id
    end
  end

  def load_capture
    @capture = Capture.find params[:id]
  end
end