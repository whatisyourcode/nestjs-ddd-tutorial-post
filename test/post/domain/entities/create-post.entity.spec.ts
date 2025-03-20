import { MAX_TITLE_LENGTH } from "../../../../src/domains/post/domain/constants/post.constraint";
import TitleLengthExceededException from "../../../../src/domains/post/domain/exceptions/title-length-exceeded.exception";
import TitleVo from "../../../../src/domains/post/domain/vos/title.vo";
import CreatePostEntity from "../../../../src/domains/post/domain/entities/create-post.entity";

describe("CreatePostEntity", () => {
  it("유효한 데이터로 CreatePostEntity를 생성해야 함", () => {
    const post = CreatePostEntity.create({
      title: TitleVo.create({ title: "Test Title" }),
      content: "Test Content",
      authorId: 100,
    });

    expect(post.getTitleVo().getTitle()).toBe("Test Title");
    expect(post.getContent()).toBe("Test Content");
    expect(post.getAuthorId()).toBe(100);
  });

  it("제목이 MAX_TITLE_LENGTH(20)자를 초과하면 예외 발생", () => {
    const longTitle: string = "A".repeat(MAX_TITLE_LENGTH + 1);
    expect(() => TitleVo.create({ title: longTitle })).toThrow(TitleLengthExceededException);
  });

  it("제목이 MAX_TITLE_LENGTH(20)자 이하면 예외 발생하지 않고 정상 생성", () => {
    const title: string = "A".repeat(MAX_TITLE_LENGTH);
    const titleVo = TitleVo.create({ title: title });
    expect(titleVo.getTitle()).toBe(title);
  });

  it("equals() 값은 값의 TitleVo 객체는 동등해야 함", () => {
    const title1: TitleVo = TitleVo.create({ title: "Same Title" });
    const title2: TitleVo = TitleVo.create({ title: "Same Title" });
    expect(title1.equals(title2)).toBe(true);
  });

  it("equals() 다른 값의 TitleVo 객체는 동등하지 않아야 함", () => {
    const title1: TitleVo = TitleVo.create({ title: "Same Title" });
    const title2: TitleVo = TitleVo.create({ title: "Different Title" });
    expect(title1.equals(title2)).toBe(false);
  });
});
