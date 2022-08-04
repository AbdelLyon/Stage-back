
import { PartialType } from "@nestjs/mapped-types";
import { CreateProjectHolderDto } from "./create-project-holder.dto";

export class UpdateProjectHolderDto extends PartialType(CreateProjectHolderDto) { }


