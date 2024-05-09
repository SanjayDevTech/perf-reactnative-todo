import { EnhancedDetailsScreenContent } from "@/components/DetailsScreen";
import { useLocalSearchParams } from "expo-router";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  return <EnhancedDetailsScreenContent id={id} />
}
