import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Patch, Post, UseInterceptors } from "@nestjs/common";

import { POST_REMOVE_USECASE } from "../../application/usecases/post.remove.usecase";
import PostPreviewUseCase, { POST_PREVIEW_USECASE} from "../../application/usecases/post.preview.usecase";
import { POST_DETAIL_USECASE } from "../../application/usecases/post.detail.usecase";
import UpdateUsecase, { UPDATE_USECASE } from "../../application/usecases/update.usecase";
import UpdateReqDto from "../../application/dtos/post-req.dto.ts/update-req.dto";
import RemoveReqDto from "../../application/dtos/post-req.dto.ts/remove-req.dto";
import CreateReqDto from "../../application/dtos/post-req.dto.ts/create-req.dto";
import PostDetailResDto from "../../application/dtos/post-res.dto.ts/post-detail-res.dto";
import PostDetailUseCase from "../../application/usecases/post.detail.usecase";
import { CREATE_POST_USECASE } from "../../application/usecases/create.post.usecase";
import PostListResDto from "../../application/dtos/post-res.dto.ts/post-list-res.dto";
import CreatePostUsecase from "../../application/usecases/create.post.usecase";
import PostRemoveUsecase from "../../application/usecases/post.remove.usecase";

@Controller({ path: "post", version: "1"})
export default class PostController {
    constructor(@Inject(POST_DETAIL_USECASE) private readonly postDetailUsecase : PostDetailUseCase,
                @Inject(POST_PREVIEW_USECASE) private readonly postPreviewUsecase: PostPreviewUseCase,
                @Inject(CREATE_POST_USECASE) private readonly createPostUsecase: CreatePostUsecase,
                @Inject(UPDATE_USECASE) private readonly updateUsecase: UpdateUsecase,
                @Inject(POST_REMOVE_USECASE) private readonly postRemoveUsecase: PostRemoveUsecase,
                ) {}

    @Get("detail/:id")
    @HttpCode(200)
    async getPostDetail(@Param('id') id: number): Promise<PostDetailResDto> {
        return await this.postDetailUsecase.execute(id);
    }

    @Get("list")
    @HttpCode(200)
    async getPosts(): Promise<PostListResDto> {
        return await this.postPreviewUsecase.execute();
    }
    
    @Post("create")
    @HttpCode(201)
    async createPost(@Body() createReqDto: CreateReqDto ): Promise<PostDetailResDto> {
        return await this.createPostUsecase.execute(createReqDto);
    }

    // @Post("create-dummy-data")
    // @HttpCode(201)
    // async createDummyData(): Promise<void> {    
    //     for(let i = 1; i < 101; i++) {
    //         const createReqDto: CreateReqDto = {
    //             post: {
    //                 title: `title ${i}`,
    //                 content: `content ${i}`,
    //             }
    //         };
    //         await this.postUsecase.execute(createReqDto);
    //     }
    // }

    @Patch("update")
    @HttpCode(200)
    async updatePost(@Body() updateReqDto: UpdateReqDto): Promise<PostDetailResDto> {
        return await this.updateUsecase.execute(updateReqDto);
    }

    @Delete("delete")
    @HttpCode(204)
    async removePost(@Body() removeReqDto: RemoveReqDto): Promise<void> {
        return await this.postRemoveUsecase.execute(removeReqDto);
    }
}