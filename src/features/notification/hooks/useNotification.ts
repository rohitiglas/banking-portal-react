import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchNotification,
  fetchNotificationById,
} from "../services/NotificationService";

const useNotification = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["notification"],
    queryFn: fetchNotification,
    refetchInterval: 10000,
  });

  const markReadMutation = useMutation({
    mutationFn: fetchNotificationById,

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: ["notification"],
      });

      const previous =
        queryClient.getQueryData<any[]>(["notification"]);

      queryClient.setQueryData(
        ["notification"],
        (old: any[] = []) =>
          old.map((item) =>
            item.id === id
              ? { ...item, read: true }
              : item
          )
      );

      return { previous };
    },

    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          ["notification"],
          context.previous
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["notification"],
      });
    },
  });

  return {
    data,
    isLoading,
    error,
    markReadMutation,
  };
};

export default useNotification;