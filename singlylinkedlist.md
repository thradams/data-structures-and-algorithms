🠄 [Linked lists](linked_lists.md)


# Singly Linked List


```c
struct book  {
  char title[10];
  struct book * next;
};

struct book_list {
  struct book * head,  *tail;
};
```
[source → ](linked_lists1.md)
 
```c

struct book {
    char title[10];
};

struct book_list_node {
   struct book data;
   struct book_list_node* next;
};

struct book_list {
     struct book_list_node *head, * tail;
};
```
[source → ](linked_list2.md)

```c

struct book {
    char title[10];
};

struct book_list_node {
   struct book* data;
   struct book_list_node* next;
};

struct book_list {
     struct book_list_node *head, * tail;
};
```
[source → ](linked_list3.md)

