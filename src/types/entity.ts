interface Government {
  label: "Government";
}
interface Company {
  label: "Company";
}
interface Individual {
  label: "Individual";
}
export interface Entity {
  label: Government | Company | Individual;
}
