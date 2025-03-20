import { MAX_TITLE_LENGTH } from "@/domains/post/domain/constants/post.constraint";
import TitleLengthExceededException from "@/domains/post/domain/exceptions/title-length-exceeded.exception";
import TitleVo from "@/domains/post/domain/vos/title.vo";

describe("TitleVo Value Object", () => {
  it("유효한 제목이면 TitleVo 객체가 생성되어야 함", () => {
    const title = TitleVo.create({ title: "Valid Title" });
    expect(title.getTitle()).toBe("Valid Title");
  });

  it("제목이 MAX_TITLE_LENGTH(20)자를 초과하면 예외 발생", () => {
    const longTitle = "A".repeat(MAX_TITLE_LENGTH + 1); // 21자
    expect(() => TitleVo.create({ title: longTitle })).toThrow(TitleLengthExceededException);
  });

  it("제목이 MAX_TITLE_LENGTH(20)자 이하면 정상 생성", () => {
    const maxLengthTitle = "A".repeat(MAX_TITLE_LENGTH); // 20자
    const titleVo = TitleVo.create({ title: maxLengthTitle });
    expect(titleVo.getTitle()).toBe(maxLengthTitle);
  });

  it("equals() - 같은 제목이면 true 반환", () => {
    const title1 = TitleVo.create({ title: "Same Title" });
    const title2 = TitleVo.create({ title: "Same Title" });

    expect(title1.equals(title2)).toBe(true);
  });

  it("equals() - 다른 제목이면 false 반환", () => {
    const title1 = TitleVo.create({ title: "Title One" });
    const title2 = TitleVo.create({ title: "Title Two" });

    expect(title1.equals(title2)).toBe(false);
  });
});
