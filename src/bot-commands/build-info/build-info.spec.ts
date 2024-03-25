import { EmbedBuilder } from "discord.js";
import { BuildInfo } from "./build-info";

describe("build-info test", () => {
  it("should return true when character is valid", () => {
    const expectedCharName = "kokomi";
    const expectedBuild = new BuildInfo(expectedCharName);
    const expectedValidCharacter = expectedBuild.isValidCharacter();

    expect(expectedValidCharacter).toBe(true);
  });

  it("should return false when character is invalid", () => {
    const expectedCharName = "tilapia";
    const expectedBuild = new BuildInfo(expectedCharName);
    const expectedValidCharacter = expectedBuild.isValidCharacter();

    expect(expectedValidCharacter).toBe(false);
  });

  it("should return correct image path", () => {
    const expectedCharName = "yoimiya";
    const expectedBuild = new BuildInfo(expectedCharName);
    const expectedCharBuildImgPath = expectedBuild.getCharacterBuildImageURL();

    expect(expectedCharBuildImgPath).toBe(
      "https://axxyb9bimnai.objectstorage.sa-vinhedo-1.oci.customer-oci.com/p/_g5QaiBKPbPL6YoJzbKCklZbp48N2WxT-pj7g3tOzvRa9Qs1_BMia0bPDXKaoEP8/n/axxyb9bimnai/b/bucket-20240325-0654/o/yoimiya.png"
    );
  });

  it("should return EmbedBuilder object with correct parameters", () => {
    const expectedCharName = "fischl";
    const expectedBuild = new BuildInfo(expectedCharName);
    const expectedEmbedBuilder = expectedBuild.getBuild();

    expect(expectedEmbedBuilder).toStrictEqual(
      new EmbedBuilder()
        .setTitle("Fischl - Sub DPS")
        .setImage("attachment://fischl.png")
    );
  });
});
