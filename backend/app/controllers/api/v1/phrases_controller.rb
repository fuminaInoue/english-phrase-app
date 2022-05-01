class Api::V1::PhrasesController < ApplicationController
  def index
    phrases = Phrase.where(user_id: current_api_v1_user.id)

    render json: { status: 200, phrases: phrases }
  end

  def create
    phrase = Phrase.new(prhase_params)

    if phrase.save
      render json: {status:200, message:phrase}
    else
      render json: {status: 500, message: "作成に失敗しました"}
    end
  end

  private

  def prhase_params
    params.permit(:user_id, :english, :japanese)
  end

end
