class PostsController < ApplicationController

    before_action :set_post, only: [:show, :edit, :update, :destroy]

    # GET /posts
    # GET /posts.json
    def index

      @posts = Post.all

      respond_to do |f|
        f.html { render :index }
        f.json { render json: @posts }
      end
    end

    # GET /posts/1
    # GET /posts/1.json
    def show

      @comment = Comment.new
      respond_to do |f|
        f.html { render :show }
        f.json { render json: @post }
      end
    end

    # GET /posts/new
    def new

      @post = Post.new
      @tag = Tag.new
    end

    # GET /posts/1/edit
    def edit
      @tag= @post.tags.build
    end

    # POST /posts
    # POST /posts.json
    def create


      @post = Post.new(post_params)


      respond_to do |format|
        if @post.save
          format.html { redirect_to @post, notice: 'Post was successfully created.' }
          format.json { render action: 'show', status: :created, location: @post }
        else
          format.html { render action: 'new' }
          format.json { render json: @post.errors, status: :unprocessable_entity }
        end
      end
    end

    # PATCH/PUT /posts/1
    # PATCH/PUT /posts/1.json
    def update
      respond_to do |format|
        # tag = Tag.find_or_create_by(name: params[:post][:new_tag][:tag][:name])

        if @post.update(post_params)

          # if params[:post][:new_tag][:tag][:name] != ''
          #   new_tag = Tag.find_or_create_by(name: params[:post][:new_tag][:tag][:name].downcase.strip)
          #   @post.tags << new_tag
          # end


          format.html { redirect_to @post, notice: 'Post was successfully updated.' }
          format.json { head :no_content }
        else
          format.html { render action: 'edit' }
          format.json { render json: @post.errors, status: :unprocessable_entity }
        end
      end
    end

    # DELETE /posts/1
    # DELETE /posts/1.json

    def delete_tag

    end

    def destroy
      @post.destroy
      respond_to do |format|
        format.html { redirect_to posts_url }
        format.json { head :no_content }
      end
    end

    def create_tag
      # binding.pry
      if params[:name] != ''
      tag = Tag.find_or_create_by(name: params[:name].downcase.strip)
      post = Post.find(params[:id])
      post.tags << tag
    end
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_post
        @post = Post.find(params[:id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def post_params
        params.require(:post).permit(:name, :content, :tag_ids => [], tag_attributes: [:name])
      end

      def tag_params
        params.permit(:name, :id)
      end

end
