export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = nameSelector;
    this._job = jobSelector;
    this._avatar = avatarSelector;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo({ name, job, avatar }) {
    console.log(name, job, avatar);
    this._name.textContent = name;
    this._job.textContent = job;
    this._avatar.src = avatar;
  }
}
