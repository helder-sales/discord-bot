import { EmbedBuilder } from "discord.js";
import characterBuildInfo from "./json/character-build-info.json";
import { CharacterBuildInfo } from "./types/build-info-json.type";

export class BuildInfo {
  readonly buildInfo = characterBuildInfo as CharacterBuildInfo;

  constructor(private readonly characterName: string) {
    this.characterName = this.characterName.toLowerCase();
  }

  getBuild(): EmbedBuilder {
    return new EmbedBuilder()
      .setTitle(this.setBuildTitle())
      .setImage(`attachment://${this.characterName.toLowerCase()}.png`);
  }

  getCharacterBuildImageURL(): string {
    return `https://axxyb9bimnai.objectstorage.sa-vinhedo-1.oci.customer-oci.com/p/_g5QaiBKPbPL6YoJzbKCklZbp48N2WxT-pj7g3tOzvRa9Qs1_BMia0bPDXKaoEP8/n/axxyb9bimnai/b/bucket-20240325-0654/o/${this.characterName.toLowerCase()}.png`;
  }

  isValidCharacter(): boolean {
    if (this.getCharacterBuildInfo()) {
      return true;
    } else {
      return false;
    }
  }

  private getCharacterBuildInfo(): { buildType: string } {
    return this.buildInfo[this.characterName.toUpperCase()];
  }

  private setBuildTitle(): string {
    return `${
      this.characterName.charAt(0).toUpperCase() + this.characterName.slice(1)
    } - ${this.getCharacterBuildInfo().buildType}`;
  }
}
