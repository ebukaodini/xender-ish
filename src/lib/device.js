async function getDeviceStorageDetails() {
  let details = {}
  console.log(navigator.deviceMemory);
  return await navigator.storage.estimate().then((estimate) => {
    details.totalStorageSpace = estimate.quota;
    details.usedStorageSpace = estimate.usage;
  }).then(() => {
    return details;
  });
}

async function getDevice() {

  console.log(window.navigator.appVersion);
  console.log(window.navigator);
  return window.navigator.platform;
}

export { getDeviceStorageDetails, getDevice };