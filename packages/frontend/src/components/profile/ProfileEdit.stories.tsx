import React from "react";
import { ComponentStory } from "@storybook/react";
import { ProfileEdit } from "./ProfileEdit";
import {ApiService} from "../../utils";

export default {
  title: "Profiles",
  component: ProfileEdit,
};

const apiService = new ApiService();

const Template: ComponentStory<typeof ProfileEdit> = (args) => {
  return <ProfileEdit {...args} />;
};

const onSaveComplete = async (userDid : string) : Promise<boolean> => apiService.registerDid(userDid);

export const profileEdit = Template.bind({});
profileEdit.args = {
  onSaveComplete
}
profileEdit.storyName = "ProfileEdit";
